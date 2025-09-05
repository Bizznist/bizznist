/* global CMS, createClass, h */

(function () {
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function toHtmlTable(rows) {
    const safeRows = rows && rows.length ? rows : [[""]];
    const htmlRows = safeRows
      .map(
        (r) =>
          "<tr>" +
          r.map((c) => `<td style="padding:6px;border:1px solid #ccc;">${escapeHtml(c)}</td>`).join("") +
          "</tr>"
      )
      .join("");
    return `<table data-ncms-table="1" style="border-collapse:collapse;width:100%">${htmlRows}</table>`;
  }

  function fromHtmlTable(html) {
    const rows = [];
    const rowMatches = html.match(/<tr[\s\S]*?<\/tr>/gi) || [];
    rowMatches.forEach((rowHtml) => {
      const cells = [];
      const cellMatches = rowHtml.match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || [];
      cellMatches.forEach((cellHtml) => {
        const inner = cellHtml
          .replace(/<td[^>]*>/i, "")
          .replace(/<\/td>/i, "")
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/&nbsp;/g, " ")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&amp;/g, "&")
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'");
        cells.push(inner.trim());
      });
      rows.push(cells.length ? cells : [""]);
    });
    return rows.length ? rows : [[""]];
  }

  const TableControl = createClass({
    getInitialState: function () {
      return { rows: this.props.value && this.props.value.length ? this.props.value : [[""]] };
    },

    update(rows) {
      this.setState({ rows });
      this.props.onChange(rows);
    },

    handleChange: function (r, c, e) {
      const rows = this.state.rows.map((row) => row.slice());
      rows[r][c] = e.target.value;
      this.update(rows);
    },

    addRow: function () {
      const cols = this.state.rows[0] ? this.state.rows[0].length : 1;
      const rows = this.state.rows.concat([Array(cols).fill("")]);
      this.update(rows);
    },

    addCol: function () {
      const rows = this.state.rows.map((row) => row.concat([""]));
      this.update(rows);
    },

    render: function () {
      const { rows } = this.state;

      return h(
        "div",
        {},
        h(
          "table",
          { style: { borderCollapse: "collapse", width: "100%" } },
          h(
            "tbody",
            {},
            rows.map((row, rIdx) =>
              h(
                "tr",
                { key: rIdx },
                row.map((cell, cIdx) =>
                  h(
                    "td",
                    { key: cIdx, style: { border: "1px solid #ccc", padding: "0" } },
                    h("input", {
                      type: "text",
                      value: cell,
                      onChange: (e) => this.handleChange(rIdx, cIdx, e),
                      style: { width: "100%", padding: "6px", border: "none", outline: "none" },
                    })
                  )
                )
              )
            )
          )
        ),
        h(
          "div",
          { style: { marginTop: "10px" } },
          h("button", { type: "button", onClick: this.addRow }, "➕ Add Row"),
          h("button", { type: "button", onClick: this.addCol, style: { marginLeft: "8px" } }, "➕ Add Column")
        )
      );
    },
  });

  const TablePreview = createClass({
    render: function () {
      return h("div", { dangerouslySetInnerHTML: { __html: toHtmlTable(this.props.value || [[""]]) } });
    },
  });

  CMS.registerWidget("tablegrid", TableControl, TablePreview);

  CMS.registerEditorComponent({
    id: "table",
    label: "Table",
    fields: [{ name: "rows", label: "Rows", widget: "tablegrid" }],
    pattern: /<table[^>]*data-ncms-table="1"[^>]*>[\s\S]*?<\/table>/i,
    fromBlock: function (match) {
      return { rows: fromHtmlTable(match[0]) };
    },
    toBlock: function (obj) {
      return toHtmlTable(obj.rows || [[""]]);
    },
    toPreview: function (obj) {
      return toHtmlTable(obj.rows || [[""]]);
    },
  });
})();
