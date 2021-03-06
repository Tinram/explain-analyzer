var o = require("mithril/ospec/ospec")
// Polyfill DOM env for mithril
global.window = require("mithril/test-utils/browserMock.js")();
global.document = window.document;

var Explain = require("../Explain")

o.spec("Explain", function() {
  o("parses a JSON explain", function() {
    var explain = new Explain();
    explain.data = {
      "query_block": {
        "grouping_operation": {
          "nested_loop": [
            {
              "table": {
                "access_type": "ALL",
                "rows_examined_per_scan": 1609,
                "table_name": "table_a"
              }
            },
            {
              "table": {
                "access_type": "ref",
                "rows_examined_per_scan": 1,
                "rows_produced_per_join": 257,
                "table_name": "table_b"
              }
            }
          ]
        },
        "select_id": 1
      }
    };
    Explain.parse(explain)

    o(explain.tables.length).equals(2)
  })

  o("handles 'rows'", function() {
    var explain = new Explain();
    explain.data = {
      "query_block": {
        "grouping_operation": {
          "nested_loop": [
            {
              "table": {
                "access_type": "ALL",
                "rows": 1609,
                "table_name": "table_a"
              }
            },
            {
              "table": {
                "access_type": "ref",
                "rows": 1,
                "rows_produced_per_join": 257,
                "table_name": "table_b"
              }
            }
          ]
        },
        "select_id": 1
      }
    };
    Explain.parse(explain)

    o(explain.tables.length).equals(2)
    o(explain.tables[0].rows).equals(1609)
    o(explain.tables[1].rows).equals(1)
  })
})
