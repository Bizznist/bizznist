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
    const rows = this.state.rows.concat([[...Array(this.state.rows[0].length).fill("")]]);
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
                    onChange: this.handleChange.bind(this, row, col)
                  })
                )
              )
            )
          )
        )
      ),
      h("button", { type: "button", onClick: this.addRow }, "➕ Add Row"),
      h("button", { type: "button", onClick: this.addColumn }, "➕ Add Column")
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
            r.map((c, col) => h("td", { key: col }, c))
          )
        )
      )
    );
  }
});

CMS.registerWidget("table", TableControl, TablePreview);
