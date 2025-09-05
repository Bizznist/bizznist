CMS.registerEditorComponent({
  id: "table",
  label: "Table",
  fields: [
    {
      name: "rows",
      label: "Table Content",
      widget: "text",
      default: "Row1Col1,Row1Col2\nRow2Col1,Row2Col2",
      hint: "Enter each row on a new line, cells separated by commas"
    }
  ],
  pattern: /^<table>[\s\S]*<\/table>$/,
  fromBlock: function() {
    return {};
  },
  toBlock: function(obj) {
    if (!obj.rows) return "";
    const rows = obj.rows.split("\n").map(r => r.split(","));
    return (
      "<table border='1' style='border-collapse:collapse;width:100%'>" +
      rows
        .map(
          r =>
            "<tr>" +
            r
              .map(
                c =>
                  `<td style="padding:6px;width:200px;height:60px;vertical-align:top">${c.trim()}</td>`
              )
              .join("") +
            "</tr>"
        )
        .join("") +
      "</table>"
    );
  },
  toPreview: function(obj) {
    return this.toBlock(obj);
  }
});
