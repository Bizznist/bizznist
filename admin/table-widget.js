/* global CMS, createClass, h */

const TableControl = createClass({
  getInitialState: function () {
    const value = this.props.value || [[""]];
    return { rows: value };
  },

  update(rows) {
    this.setState({ rows });
    this.props.onChange(rows);
  },

  handleChange: function (row, col, e) {
    const rows = this.state.rows.slice();
    rows[row][col] = e.target.value;
    this.update(rows);
  },

  addRow: function () {
    const rows = this.state.rows.concat([
      [...Array(this.state.rows[0].length).fill("")]
    ]);
    this.update(rows);
  },

  addColumn: function () {
    const rows = this.state.rows.map(r => r.concat([""]));
    this.update(rows);
  },

  makeBold: function () {
    if (this.lastEdited) {
      this.lastEdited.value += "**bold**"; // markdown-style
      this.handleChange(this.lastRow, this.lastCol, { target: this.lastEdited });
    }
  },

  makeItalic: function () {
    if (this.lastEdited) {
      this.lastEdited.value += "*italic*"; // markdown-style
      this.handleChange(this.lastRow, this.lastCol, { target: this.lastEdited });
    }
  },

  render: function () {
    return h("div", {},
      // Toolbar
      h("div", { style: { marginBottom: "10px" } },
        h("button", { type: "button", onClick: this.makeBold }, "B"),
        h("button", { type: "button", style: { marginLeft: "6px" }, onClick: this.makeItalic }, "I")
      ),

      h("table", { border: 1, style: { borderCollapse: "collapse", width: "100%" } },
        h("tbody", {},
          this.state.rows.map((r, row) =>
            h("tr", { key: row },
              r.map((c, col) =>
                h("td", { key: col, style: { padding: "6px", verticalAlign: "top", width: "200px", height: "80px" } },
                  h("textarea", {
                    value: c,
                    rows: 3,
                    style: {
                      width: "100%",
                      height: "80px",
                      resize: "both",
                      boxSizing: "border-box"
                    },
                    onChange: this.handleChange.bind(this, row, col),
                    onFocus: (e) => {
                      this.lastEdited = e.target;
                      this.lastRow = row;
                      this.lastCol = col;
                    }
                  })
                )
              )
            )
          )
        )
      ),

      h("div", { style: { marginTop: "10px" } },
        h("button", { type: "button", onClick: this.addRow }, "➕ Add Row"),
        h("button", { type: "button", onClick: this.addColumn, style: { marginLeft: "8px" } }, "➕ Add Column")
      )
    );
  }
});

const TablePreview = createClass({
  render: function () {
    const rows = this.props.value || [];
    if (!rows.length) return h("div", {}, "No table data");
    return h("table", { border: 1, style: { borderCollapse: "collapse", width: "100%" } },
      h("tbody", {},
        rows.map((r, row) =>
          h("tr", { key: row },
            r.map((c, col) =>
              h("td", { key: col, style: { padding: "6px", width: "200px", height: "80px", verticalAlign: "top" } },
                c
              )
            )
          )
        )
      )
    );
  }
});

CMS.registerWidget("table", TableControl, TablePreview);
