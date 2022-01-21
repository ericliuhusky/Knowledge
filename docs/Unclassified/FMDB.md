# FMDB

## Swift

```swift
import FMDB

let db = FMDatabase(path: "test.db")
if !db.open() {
    
}

try db.executeUpdate("SQL STATEMENT", values: nil)

let resultSet = try! db.executeQuery("SQL STATEMENT", values: nil)
while resultSet.next() {
    print(resultSet.string(forColumn: "name"), resultSet.int(forColumn: "age"))
}


let queue = FMDatabaseQueue(path: "test.db")
queue?.inDatabase { db in
    
}

db.close()
```

## OC

```objc
@import FMDB;

FMDatabase *db = [FMDatabase databaseWithPath:@"test.db"];
if(![db open]) {
    db = nil;
    return 1;
}

[db executeUpdate:@"SQL STATEMENT"];

FMResultSet *resultSet = [db executeQuery:@"SQL STATEMENT"];
while ([resultSet next]) {
    NSLog(@"%@", [resultSet stringForColumn:@"name"]);
    NSLog(@"%d", [resultSet intForColumn:@"age"]);
}


FMDatabaseQueue *queue = [FMDatabaseQueue databaseQueueWithPath:@"test.db"];
[queue inDatabase:^(FMDatabase * _Nonnull db) {
    
}];

[db close];
```
