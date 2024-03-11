class TableTemplate {
    static fillIn(tableId, dictionary, columnName) {
      const table = document.getElementById(tableId);
  
      if (!table) {
        console.error(`Table with id ${tableId} not found.`);
        return;
      }
  
      const rows = table.rows;
  
      const headerRow = rows[0];
      this.processRow(headerRow, dictionary);
  
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
  
        if (columnName) {
          const columnIndex = this.getColumnIndex(headerRow, columnName);
          if (columnIndex !== -1) {
            const cell = row.cells[columnIndex];
            this.processCell(cell, dictionary);
          }
        } else {
          // Process entire table
          this.processRow(row, dictionary);
        }
      }
  
      table.style.visibility = "visible";
    }
  
    static processRow(row, dictionary) {
      for (let j = 0; j < row.cells.length; j++) {
        this.processCell(row.cells[j], dictionary);
      }
    }
  
    static processCell(cell, dictionary) {
      const processedText = this.processText(cell.textContent, dictionary);
      cell.textContent = processedText;
    }
  
    static processText(text, dictionary) {
      return processTemplateString(text, dictionary);
    }
  
    static getColumnIndex(headerRow, columnName) {
      for (let i = 0; i < headerRow.cells.length; i++) {
        if (headerRow.cells[i].textContent === columnName) {
          return i;
        }
      }
      return -1;
    }
  }
  function processTemplateString(template, dictionary) {
    return template.replace(/\{\{(.*?)\}\}/g, (match, p1) => {
      const property = p1.trim();
      return dictionary.hasOwnProperty(property) ? dictionary[property] : "";
    });
  }
  (function patchTable() {
    const dict = {
      PartNumber: "Part Number",
      Length: "Length",
      n14926: "14926",
      n47: "47",
      n773: "773",
      n3_5: "3.5",
      n9318: "9318",
      n10: "10",
      n3045: "3045",
      n4: "4",
    };
  
    // fill in second column
    TableTemplate.fillIn("table1", dict, "Length");
  
    // fill in first column
    TableTemplate.fillIn("table2", dict, "Part Number");
  
    // no column name passed in
    TableTemplate.fillIn("table3", dict);
  })();
  