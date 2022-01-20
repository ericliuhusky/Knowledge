# SQLite3

## Swift

```swift
import SQLite3

var db: OpaquePointer?
var resultCode = sqlite3_open("test.db", &db)

if resultCode != SQLITE_OK {
    print(String(cString: sqlite3_errmsg(db)))
    sqlite3_close(db)
}


var errmsg: UnsafeMutablePointer<CChar>?
var customValue = "custom value"

resultCode = sqlite3_exec(db, "SQL STATEMENT", { custom, count, values, keys in
    print(String(cString: unsafeBitCast(custom, to: UnsafeMutablePointer<CChar>.self)))
    
    for i in 0..<Int(count) {
        print("\(String(cString: keys![i]!)): \(String(cString: values![i]!))")
    }
    
    return 0
}, UnsafeMutableRawPointer(&customValue), &errmsg)

if resultCode != SQLITE_OK {
    print(String(cString: errmsg!))
    sqlite3_free(errmsg)
}

sqlite3_close(db)
```

## C

```c
#include <stdio.h>
#include <sqlite3.h>

int callback(void *custom, int count, char **values, char **keys){
    printf("%s\n", (char*)custom);
    for(int i=0; i<count; i++) {
        printf("%s: %s\n", keys[i], values[i] ? values[i] : "NULL");
    }
    return 0;
}

int main(int argc, const char * argv[]) {
    sqlite3 *db;
    int rc = sqlite3_open("test.db", &db);
    if(rc != SQLITE_OK) {
        printf("%s", sqlite3_errmsg(db));
        sqlite3_close(db);
        return 1;
    }
    
    char *errmsg;
    rc = sqlite3_exec(db, "SQL STATEMENT", callback, "custom value", &errmsg);
    if(rc != SQLITE_OK) {
        printf("%s", errmsg);
        sqlite3_free(errmsg);
    }
    
    sqlite3_close(db);
    
    return 0;
}
```
