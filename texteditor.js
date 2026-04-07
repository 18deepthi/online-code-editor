const JAVA_KEY = "62";
const CPP_KEY = "53";
const PYTHON_KEY = "70";

const BASE_URL = "https://ce.judge0.com/submissions?base64_encoded=false&wait=true";

function codeEditor(lang_id) {

  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/twilight");

  // Remove old click events
  $("button").off("click");

  $("button").click(function () {

    let code = editor.getValue();
    $("#ans").html("⏳ Running...");

    let data = {
      source_code: code,
      language_id: lang_id,
      stdin: $("#inputBox").val()
    };

    $.ajax({
      url: BASE_URL,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),

      success: function (response) {

        if (response.stdout) {
          $("#ans").html(response.stdout);
        } else if (response.stderr) {
          $("#ans").html(response.stderr);
        } else if (response.compile_output) {
          $("#ans").html(response.compile_output);
        } else {
          $("#ans").html("No output");
        }
      },

      error: function () {
        $("#ans").html("Error while executing");
      }
    });
  });

  // Default code

  if (lang_id == PYTHON_KEY) {
    editor.setValue(
`def execute():
    for i in range(5):
        print(i)

execute()`
    );
  }

  if (lang_id == JAVA_KEY) {
    editor.setValue(
`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}`
    );
  }

  if (lang_id == CPP_KEY) {
    editor.setValue(
`#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}`
    );
  }
}