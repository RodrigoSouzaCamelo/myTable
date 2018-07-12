# myTable
Dynamic table created in javascript

## Quick start
To use data from a variable use the following code
```javascript
     myTable({
         tableDiv: "myTable",
         pager: "pager",
         mockup: data,
         colNames: [
             { name:"Id", index:"id" },
             { name:"Nome", index:"name" },
             { name:"E-mail", index:"email" }
         ]
     });
```
To use data from an API use the following code
```javascript
     myTable({
        tableDiv: "myTable",
        pager: "pager",
        url:"http://your-url.com/api",
        datatype: "json",
        colNames: [
            { name:"Id", index:"id" },
            { name:"Nome", index:"name" },
            { name:"E-mail", index:"email" }
        ]
    });
```