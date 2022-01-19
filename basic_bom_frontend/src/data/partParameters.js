const partParameters = 
[
    {
        "field": "id",
        "headerName": "ID",
        "hide": true
    },
    {
        "field": "bom_type",
        "headerName": "BOM Tree",
        "minWidth": 100,
        "width": 150
    },
    {
        "field": "material_id",
        "headerName": "Material",
        "minWidth": 50,
        "width": 130,
        "type": "number",
    },
    {
        "field": "drawing",
        "headerName": "DWG",
        "type": "boolean",
        "minWidth": 50,
        "width": 110
    },
    {
        "field": "part_num",
        "headerName": "Part NUM",
        "minWidth": 120,
        "width": 140
    },
    {
        "field": "revision",
        "headerName": "REV",
        "type": "number",
        "minWidth": 50,
        "width": 110
        
    },
    {
        "field": "description",
        "headerName": "Description",
        "minWidth": 200,
        "editable": true,
        "flex": 0.5
    },
    {
        "field": "qty_per",
        "headerName": "QTY Per",
        "type": "number",
        "minWidth": 50,
        "width": 130
    },
    {
        "field": "source",
        "headerName": "Source",
        "minWidth": 50,
        "width": 130
    },
    {
        "field": "supplier_id",
        "headerName": "Supplier ID",
        "type": "number",
        "minWidth": 50,
        "width": 150
    },
    {
        "field": "order_qty",
        "headerName": "Order QTY",
        "type": "number",
        "minWidth": 50,
        "width": 150
    },
    {
        "field": "design_eng_comments",
        "headerName": "Comments",
        "minWidth": 200,
        "editable": true,
        "flex": 0.5
    },
    {
        "field": "location_id",
        "headerName": "Location ID",
        "type": "number",
        "minWidth": 50,
        "width": 150
    },
    {
        "field": "stock_qty",
        "headerName": "Stock QTY",
        "type": "number",
        "minWidth": 50,
        "width": 150
    },
    // {
    //     "field": "created_at",
    //     "headerName": "Created At",
    //     "minWidth": 110,
    //     "type": "dateTime",
    // },
    // {
    //     "field": "updated_at",
    //     "headerName": "Last Update",
    //     "minWidth": 110,
    //     "type": "dateTime",
    // }
];

export default partParameters;