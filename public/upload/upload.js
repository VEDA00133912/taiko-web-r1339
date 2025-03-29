document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#log-area").textContent = "ここにはログが表示されます";
  const fileInputs = document.querySelectorAll("input[type='file']");

  fileInputs.forEach((input, index) => {
    input.addEventListener("change", function () {
      if (input.files.length > 0) {
        let fileName = input.files[0].name;
        const maxLength = 25;
        const limit = maxLength + 4;

        if (fileName.length > limit) {
          const lastDotIndex = fileName.lastIndexOf(".");
          const extension =
            lastDotIndex !== -1 ? fileName.slice(lastDotIndex) : "";
          const baseName =
            lastDotIndex !== -1 ? fileName.slice(0, lastDotIndex) : fileName;

          const truncatedBase =
            baseName.slice(0, maxLength - extension.length) + "...";
          fileName = truncatedBase + extension;
        }

        input.nextElementSibling.textContent = fileName;
      } else {
        input.nextElementSibling.textContent = "ファイルが選択されていません";
      }
    });
  });
});

function logMessage(message, type = "error") {
  const logArea = document.querySelector("#log-area");
  const logEntry = document.createElement("div");

  if (type === "success") {
    logEntry.style.color = "#32CD32"; 
  } else {
    logEntry.style.color = "red";
  }

  logEntry.textContent = message;
  logArea.appendChild(logEntry);

  logArea.scrollTop = logArea.scrollHeight;
}

function uploadFiles() {
  fetch("/api/csrftoken")
    .then((response) => {
      if (!response.ok) {
        throw new Error("CSRFトークンの取得に失敗しました");
      }
      return response.json();
    })
    .then((tokenData) => {
      const csrfToken = tokenData.token;
      const form = document.querySelector("#upload-form");
      const formData = new FormData(form);

      return fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      });
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          res.url + " で " + res.status.toString() + " が発生しました。",
        );
      }
    })
    .then((data) => {
      if (data.success) {
        logMessage("譜面の投稿に成功しました！", "success");
      } else {
        throw new Error(data.error);
      }
    })
    .catch((error) => {
      console.error("エラー:", error);
      logMessage(error.message || "不明なエラーが発生しました。");
    });
}
