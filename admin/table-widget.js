/* global CMS, createClass, h */

(function () {
  // ---------- Utility helpers ----------
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function toHtmlTable(value) {
    const v = value || {};
    const rows = Array.isArray(v.rows) && v.rows.length ? v.rows : [[""]];
    const cellWidth = Number(v.cellWidth) || 200;
    const cellHeight = Number(v.cellHeight) || 64;
    const headerRow = !!v.headerRow;

    const cellStyle = `padding:6px;vertical-align:top;width:${cellWidth}px;height:${cellHeight}px;`;

    const htmlRows = rows
      .map((r, i) => {
        const tag = headerRow && i === 0 ? "th" : "td";
        const cells = r
          .map((c) => `<${tag} style="${cellStyle}">${escapeHtml(c).replace(/\n/g, "<br/>")}</${tag}>`)
          .join("");
        return `<tr>${cells}</tr>`;
      })
      .join("");

    return `<table data-ncms-table="1" border="1" style="border-collapse:collapse;width:100%">${htmlRows}</table>`;
  }

  function fromHtmlTable(html) {
    // Very simple parser; good enough for tables produced by toHtmlTable()
    const rows = [];
    const rowMatches = html.match(/<tr[\s\S]*?<\/tr>/gi) || [];
    rowMatches.forEach((rowHtml) => {
      const cells = [];
      const cellMatches = rowHtml.match(/<(td|th)[^>]*>([\s\S]*?)<\/\1>/gi) || [];
      cellMatches.forEach((cellHtml) => {
        const inner = cellHtml
          .replace(/<(?!br\s*\/?)[^>]+>/gi, "") // strip tags except <br>
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

    const headerRow = /<th/i.test(html);
    // Try to read width/height from first cell if present
    const styleMatch = html.match(/style="[^"]*width:(\d+)px;[^"]*height:(\d+)px;?/i);
    const cellWidth = styleMatch ? Number(styleMatch[1]) : 200;
    const cellHeight = styleMatch ? Number(styleMatch[2]) : 64;

    return { rows: rows.length ? rows : [[""]], cellWidth, cellHeight, headerRow };
  }

  // ---------- Custom grid widget (used inside the editor component) ----------
  const TableGridControl = createClass({
    getInitialState: function () {
      const v = this.props.value || {};
      const rows = Array.isArray(v.rows) && v.rows.length ? v.rows : [[""]];
      return {
        rows,
        cellWidth: Number(v.cellWidth) || 200,
        cellHeight: Number(v.cellHeight) || 64,
        headerRow: !!v.headerRow,
      };
    },

    updateValue(updates) {
      const next = Object.assign(
        {
          rows: this.state.rows,
          cellWidth: this.state.cellWidth,
          cellHeight: this.state.cellHeight,
          headerRow: this.state.headerRow,
        },
        updates || {}
      );
      this.setState(next);
      this.props.onChange(next);
    },

    setCell: function (r, c, e) {
      const rows = this.state.rows.map((row) => row.slice());
      rows[r][c] = e.target.value;
      this.updateValue({ rows });
    },

    addRow: function () {
      const cols = this.state.rows[0] ? this.state.rows[0].length : 1;
      const rows = this.state.rows.concat([Array(cols).fill("")]);
      this.updateValue({ rows });
    },

    addCol: function () {
      const rows = this.state.rows.map((row) => row.concat([""]));
      this.updateValue({ rows });
    },

    removeRow: function (idx) {
      if (this.state.rows.length <= 1) return;
      const rows = this.state.rows.slice();
      rows.splice(idx, 1);
      this.updateValue({ rows });
    },

    removeCol: function (idx) {
      if (!this.state.rows[0] || this.state.rows[0].length <= 1) return;
      const rows = this.state.rows.map((row) => {
        const r = row.slice();
        r.splice(idx, 1);
        return r;
      });
      this.updateValue({ rows });
    },

    render: function () {
      const { rows, cellWidth, cellHeight, headerRow } = this.state;

      const toolbar = h(
        "div",
        { style: { marginBottom: "8px", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" } },
        h("label", {}, "Cell W (px): ",
          h("input", {
            type: "number",
            min: "40",
            value: cellWidth,
            onChange: (e) => this.updateValue({ cellWidth: Number(e.target.value) || 200 }),
            style: { width: "80px" },
          })
        ),
        h("label", {}, "Cell H (px): ",
          h("input", {
            type: "number",
            min: "24",
            value: cellHeight,
            onChange: (e) => this.updateValue({ cellHeight: Number(e.target.value) || 64 }),
            style: { width: "80px" },
          })
        ),
        h("label", {},
          h("input", {
            type: "checkbox",
            checked: headerRow,
            onChange: (e) => this.updateValue({ headerRow: e.target.checked }),
          }),
          " First row is header"
        ),
        h("button", { type: "button", onClick: this.addRow }, "➕ Row"),
        h("button", { type: "button", onClick: this.addCol }, "➕ Col")
      );

      const table = h(
        "table",
        {
          border: 1,
          style: { borderCollapse: "collapse", width: "100%" },
        },
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
                  {
                    key: cIdx,
                    style: { padding: "4px", verticalAlign: "top" },
                  },
                  h("div", { style: { display: "flex", gap: "6px", alignItems: "center", marginBottom: "4px" } },
                    h("small", { style: { opacity: 0.7 } }, `R${rIdx + 1}C${cIdx + 1}`),
                    h("button", { type: "button", onClick: () => this.removeRow(rIdx) }, "✖ Row"),
                    h("button", { type: "button", onClick: () => this.removeCol(cIdx) }, "✖ Col")
                  ),
                  h("textarea", {
                    value: cell,
                    rows: Math.max(2, Math.round(cellHeight / 24)),
                    style: {
                      width: `${cellWidth}px`,
                      height: `${cellHeight}px`,
                      boxSizing: "border-box",
                      resize: "both",
                    },
                    onChange: (e) => this.setCell(rIdx, cIdx, e),
                  })
                )
              )
            )
          )
        )
      );

      return h("div", {}, toolbar, table);
    },
  });

  const TableGridPreview = createClass({
    render: function () {
      const v = this.props.value || {};
      return h("div", { dangerouslySetInnerHTML: { __html: toHtmlTable(v) } });
    },
  });

  // Register the grid widget (only used inside the component form)
  CMS.registerWidget("tablegrid", TableGridControl, TableGridPreview);

  // Register the editor component so it appears under the "+" menu in Body
  CMS.registerEditorComponent({
    id: "table",
    label: "Table",
    fields: [
      {
        name: "table",
        label: "Table",
        widget: "tablegrid",
        default: { rows: [[""]], cellWidth: 200, cellHeight: 64, headerRow: false },
      },
    ],
    // Only pick up tables inserted by this component (prevents matching other HTML)
    pattern: /<table[^>]*data-ncms-table="1"[^>]*>[\s\S]*?<\/table>/i,
    fromBlock: function (match) {
      try {
        return { table: fromHtmlTable(match[0]) };
      } catch (e) {
        return { table: { rows: [[""]], cellWidth: 200, cellHeight: 64, headerRow: false } };
      }
    },
    toBlock: function (obj) {
      return toHtmlTable(obj.table || obj);
    },
    toPreview: function (obj) {
      return toHtmlTable(obj.table || obj);
    },
  });
})();
