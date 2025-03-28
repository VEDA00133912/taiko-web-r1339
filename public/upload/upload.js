document.addEventListener("DOMContentLoaded", function () {
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
        alert("譜面の投稿に成功しました！");
      } else {
        throw new Error(data.error);
      }
    })
    .catch((error) => {
      console.error("エラー:", error);
      document.querySelector("#error-view").textContent = error;
    });
}
