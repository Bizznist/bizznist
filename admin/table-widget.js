CMS.registerEditorComponent({
  id: "table",
  label: "Table",
  fields: [
    {
      name: "rows",
      label: "Table Data",
      widget: "list",
      field: { label: "Columns", name: "cols", widget: "list", field: { label: "Cell", name: "cell", widget: "string" } }
    }
  ],
  // Detect markdown table pattern
  pattern: /^(\|.+\|)+$/s,
  fromBlock: function(match) {
    const lines = match[0].trim().split("\n");
    const rows = lines
      .filter(l => l.startsWith("|"))
      .map(l =>
        l
          .split("|")
          .slice(1, -1)
          .map(cell => cell.trim())
      );
    return { rows };
  },
  toBlock: function(obj) {
    const rows = obj.rows || [];
    if (!rows.length) return "";
    const header = rows[0].map(() => "---");
    return (
      "| " + rows[0].join(" | ") + " |\n" +
      "| " + header.join(" | ") + " |\n" +
      rows.slice(1).map(r => "| " + r.join(" | ") + " |").join("\n")
    );
  },
  toPreview: function(obj) {
    const rows = obj.rows || [];
    if (!rows.length) return "<em>No table</em>";
    const header = rows[0].map(() => "---");
    return (
      "<table border='1' style='border-collapse:collapse;'><tbody>" +
      "<tr>" + rows[0].map(c => `<th style='padding:4px;'>${c}</th>`).join("") + "</tr>" +
      rows.slice(1).map(r => "<tr>" + r.map(c => `<td style='padding:4px;'>${c}</td>`).join("") + "</tr>").join("") +
      "</tbody></table>"
    );
  }
});
