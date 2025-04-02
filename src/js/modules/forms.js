const forms = () => {
  const forms = document.querySelectorAll("form");
  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    postData(item);
  });

  // Способ XMLHttpRequest + formData, формат данных multipart/form-data

  // function postData(form) {
  //   form.addEventListener("submit", (e) => {
  //     e.preventDefault();

  //     let statusMessage = document.createElement("div");
  //     statusMessage.classList.add("status");
  //     statusMessage.textContent = message.loading;
  //     form.appendChild(statusMessage);

  //     const request = new XMLHttpRequest();

  //     request.open("POST", "assets/server.php");

  //     // request.setRequestHeader('Content-type', 'multipart/form-data');
  //     const formData = new FormData(form);

  //     request.send(formData);

  //     request.addEventListener("load", () => {
  //       if (request.status === 200) {
  //         console.log(request.response);
  //         statusMessage.textContent = message.success;
  //         form.reset();

  //         setTimeout(() => {
  //           statusMessage.remove();
  //         }, 2000);
  //       } else {
  //         statusMessage.textContent = message.failure;
  //       }
  //     });
  //   });
  // }

  // Способ XHR + formData + decode formData to JSON

  // function postData(form) {
  //   form.addEventListener("submit", (e) => {
  //     e.preventDefault();

  //     let statusMessage = document.createElement("div");
  //     statusMessage.classList.add("status");
  //     statusMessage.textContent = message.loading;
  //     form.appendChild(statusMessage);

  //     const request = new XMLHttpRequest();

  //     request.open("POST", "assets/server.php");

  //     request.setRequestHeader("Content-type", "application/json");
  //     const formData = new FormData(form);

  //     const object = {};

  //     formData.forEach((value, key) => {
  //       object[key] = value;
  //     });

  //     const json = JSON.stringify(object);

  //     request.send(json);

  //     request.addEventListener("load", () => {
  //       if (request.status === 200) {
  //         console.log(request.response);
  //         statusMessage.textContent = message.success;
  //         form.reset();

  //         setTimeout(() => {
  //           statusMessage.remove();
  //         }, 2000);
  //       } else {
  //         statusMessage.textContent = message.failure;
  //       }
  //     });
  //   });
  // }

  // Способ fetch + formData
  // function postData(form) {
  //   form.addEventListener("submit", (e) => {
  //     e.preventDefault();

  //     let statusMessage = document.createElement("div");
  //     statusMessage.classList.add("status");
  //     statusMessage.textContent = message.loading;
  //     form.appendChild(statusMessage);

  //     const formData = new FormData(form);

  //     fetch("assets/server.php", {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then(data => data.text())
  //       .then((data) => {
  //         console.log(data);
  //         statusMessage.textContent = message.success;
  //         form.reset();
  //         statusMessage.remove();
  //       })
  //       .catch(() => {
  //         statusMessage.textContent = message.failure;
  //       })
  //       .finally(() => {
  //         form.reset();
  //       });
  //   });
  // }

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      statusMessage.textContent = message.loading;
      form.appendChild(statusMessage);

      const formData = new FormData(form);

      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      }); 

      fetch("assets/server.php", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(object),
      })
        .then((data) => data.text())
        .then((data) => {
          console.log(data);
          statusMessage.textContent = message.success;
          form.reset();
          statusMessage.remove();
        })
        .catch(() => {
          statusMessage.textContent = message.failure;
        })
        .finally(() => {
          form.reset();
        });
    });
  }
};
export default forms;
