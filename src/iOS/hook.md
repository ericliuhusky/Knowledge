# hook

## 动态链接系统库函数绑定 Fishhook原理模拟

得到符号绑定表，替换绑定的函数地址

```swift
@preconcurrency import Darwin
import MachO

func rebindSymbol<CFunc>(name: String, block: @escaping (_ oldFunc: CFunc) -> CFunc) {
    vm_protect(mach_task_self_, unsafeBitCast(got.dict["_\(name)"], to: UInt.self), 1, 0, VM_PROT_READ | VM_PROT_WRITE)
    got.dict["_\(name)"]?.pointee = unsafeBitCast(block(unsafeBitCast(got.dict["_\(name)"]?.pointee, to: CFunc.self)), to: UnsafeRawPointer.self)
}

func gotInit() {
    _dyld_register_func_for_add_image { header, slide in
        let header = header!.withMemoryRebound(to: mach_header_64.self, capacity: 1, { $0 })
        
        // segment
        var linkEditSegment: UnsafePointer<segment_command_64>!
        var symbolTableSegment: UnsafePointer<symtab_command>!
        var dynamicSymbolTableSegment: UnsafePointer<dysymtab_command>!
        var dataConstSegment: UnsafePointer<segment_command_64>?
        var segmentRawPtr = UnsafeRawPointer(header.advanced(by: 1))
        for _ in 0..<Int(header.pointee.ncmds) {
            let segmentPtr = segmentRawPtr.assumingMemoryBound(to: segment_command_64.self)
            if segmentPtr.pointee.cmd == UInt32(LC_SEGMENT_64) && segmentPtr.pointee.segmentName == SEG_LINKEDIT {
                linkEditSegment = segmentPtr
            }
            if segmentPtr.pointee.cmd == UInt32(LC_SYMTAB) {
                symbolTableSegment = segmentRawPtr.assumingMemoryBound(to: symtab_command.self)
            }
            if segmentPtr.pointee.cmd == UInt32(LC_DYSYMTAB) {
                dynamicSymbolTableSegment = segmentRawPtr.assumingMemoryBound(to: dysymtab_command.self)
            }
            if segmentPtr.pointee.cmd == UInt32(LC_SEGMENT_64) && segmentPtr.pointee.segmentName == "__DATA_CONST" {
                dataConstSegment = segmentPtr
            }
            segmentRawPtr = segmentRawPtr.advanced(by: Int(segmentPtr.pointee.cmdsize))
        }
        guard let dataConstSegment else { return }
        
        // symbol table
        let linkEditBase = UInt(slide) + UInt(linkEditSegment.pointee.vmaddr - linkEditSegment.pointee.fileoff)
        let symbolTable = UnsafePointer<nlist_64>(bitPattern: linkEditBase + UInt(symbolTableSegment.pointee.symoff))!
        let stringTable = UnsafePointer<CChar>(bitPattern: linkEditBase + UInt(symbolTableSegment.pointee.stroff))!
        let indirectSymbolTable = UnsafePointer<UInt32>(bitPattern: linkEditBase + UInt(dynamicSymbolTableSegment.pointee.indirectsymoff))!
        
        // got
        let dataConstSectionsPtr = dataConstSegment.advanced(by: 1).withMemoryRebound(to: section_64.self, capacity: 1, { $0 })
        let dataConstSections = [section_64](UnsafeBufferPointer(start: dataConstSectionsPtr, count: Int(dataConstSegment.pointee.nsects)))
        let gotSections = dataConstSections.filter { section in
            Int32(section.flags) & SECTION_TYPE == S_NON_LAZY_SYMBOL_POINTERS
        }
        
        for section in gotSections {
            for i in 0..<(Int(section.size) / MemoryLayout<UnsafeRawPointer>.size) {
                // symbol name
                let symbolTableIndex = indirectSymbolTable[Int(section.reserved1) + i]
                if symbolTableIndex == INDIRECT_SYMBOL_LOCAL || symbolTableIndex == (UInt32(INDIRECT_SYMBOL_ABS) | INDIRECT_SYMBOL_LOCAL) {
                    continue
                }
                let stringTableIndex = symbolTable[Int(symbolTableIndex)].n_un.n_strx
                let symbolName = String(cString: stringTable.advanced(by: Int(stringTableIndex)))
                
                // binding
                let indirectBinding = UnsafeMutablePointer<UnsafeRawPointer>(bitPattern: UInt(slide) + UInt(section.addr))!.advanced(by: i)
                
                got.dict[symbolName] = indirectBinding
            }
        }
    }
}

class GOT: @unchecked Sendable {
    var dict: [String: UnsafeMutablePointer<UnsafeRawPointer>] = [:]
}
let got = GOT()

extension segment_command_64 {
    var segmentName: String {
        String(cString: withUnsafePointer(to: segname, { $0.withMemoryRebound(to: CChar.self, capacity: 1, { $0 }) }))
    }
}
```

```swift
gotInit()

typealias ExitFunc = @convention(c) (Int32) -> Void
var oldExit: (ExitFunc)?
rebindSymbol(name: "exit") { oldFunc in
    oldExit = oldFunc
    return { code in
        print("hooked")
        oldExit?(code + 3)
    } as ExitFunc
}

exit(0)
```

## objc Runtime方法交换

```swift
import Foundation

@objcMembers
class A: NSObject {
    dynamic func a() {
        
    }
}

@objcMembers
class B: NSObject {
    dynamic func b() {
        
    }
}

let a = class_getInstanceMethod(A.self, #selector(A.a))!
let b = class_getInstanceMethod(B.self, #selector(B.b))!
method_exchangeImplementations(a, b)

A().a()
```

## swift dynamicReplacement

```swift
dynamic func a() {
    
}

@_dynamicReplacement(for:a)
func b() {
    
}

a()
```
