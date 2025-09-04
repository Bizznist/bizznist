const TableControl = createClass({
  getInitialState: function () {
    const value = this.props.value || [[""]];
    return { rows: value };
  },
  handleChange: function (row, col, e) {
    const rows = this.state.rows.slice();
    rows[row][col] = e.target.value;
    this.setState({ rows });
    this.props.onChange(rows);
  },
  addRow: function () {
    const rows = this.state.rows.concat([
      [...Array(this.state.rows[0].length).fill("")]
    ]);
    this.setState({ rows });
    this.props.onChange(rows);
  },
  addColumn: function () {
    const rows = this.state.rows.map(r => r.concat([""]));
    this.setState({ rows });
    this.props.onChange(rows);
  },
  render: function () {
    return h("div", {},
      h("table", { border: 1, style: { borderCollapse: "collapse" } },
        h("tbody", {},
          this.state.rows.map((r, row) =>
            h("tr", { key: row },
              r.map((c, col) =>
                h("td", { key: col },
                  h("input", {
                    value: c,
                    onChange: this.handleChange.bind(this, row, col),
                    style: { width: "100px", padding: "4px" }
                  })
                )
              )
            )
          )
        )
      ),
      h("div", { style: { marginTop: "5px" } },
        h("button", { type: "button", onClick: this.addRow }, "➕ Add Row"),
        h("button", { type: "button", onClick: this.addColumn, style: { marginLeft: "10px" } }, "➕ Add Column")
      )
    );
  }
});

const TablePreview = createClass({
  render: function () {
    const rows = this.props.value || [];
    if (!rows.length) return h("div", {}, "No table data");
    return h("table", { border: 1, style: { borderCollapse: "collapse" } },
      h("tbody", {},
        rows.map((r, row) =>
          h("tr", { key: row },
            r.map((c, col) => h("td", { key: col, style: { padding: "4px" } }, c))
          )
        )
      )
    );
  }
});

CMS.registerEditorComponent({
  id: "table",
  label: "Table",
  fields: [{ name: "rows", label: "Rows", widget: "table" }],
  pattern: /^(\|.+\|)+$/s,
  fromBlock: function(match) {
    const lines = match[0].trim().split("\n");
    const rows = lines
      .filter(l => l.startsWith("|"))
      .map(l =>
        l.split("|").slice(1, -1).map(cell => cell.trim())
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
    return TablePreview({ value: obj.rows });
  }
});

CMS.registerWidget("table", TableControl, TablePreview);
