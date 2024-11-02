(function () {
    const submitBtnSelector = "button[type='submit'], input[type='submit']";
    window.addEventListener('load', (event) => {
        document.querySelectorAll(submitBtnSelector).forEach(i => {
            i.addEventListener("click", (event) => {
                event.preventDefault();
                const btn = event.target;
                if (btn.getAttribute('disabled') === 'disabled')
                    return;
                btn.setAttribute('disabled', 'disabled');
                setAntiforgeryTokens().then(() => {
                    // submitting the form via JS does not dispatch submitform event as per JS specs
                    // the event is used in other scripts for client side validation
                    const form = btn.closest('form');
                    var submitEvent;
                    try {
                        // DOM4
                        submitEvent = new Event('submit', true, true);
                    } catch (error) {
                        // DOM2
                        submitEvent = document.createEvent('Event');
                        submitEvent.initEvent('submit', true, true)
                    }

                    const shouldSubmit = form.dispatchEvent(submitEvent);
                    if (shouldSubmit && form.checkValidity()) {
                        form.submit();
                    } else {
                        btn.removeAttribute('disabled');
                    }
                }, err => {
                    console.log('Antiforgery token retrieval failed: ' + err);
                    btn.removeAttribute('disabled');
                });
            }, false);
        });
    });

    function setAntiforgeryTokens() {
        return new Promise((resolve, reject) => {
            const service = document.querySelector("input[name='antiCsrfService'").value;
            const headerName = document.querySelector("input[name='antiCsrfCustomHeaderName'").value;
            let xhr = new XMLHttpRequest();
            xhr.open('GET.html', service);
            xhr.setRequestHeader(headerName, 'true')
            xhr.responseType = 'json';
            xhr.onload = function () {
                const response = xhr.response;
                if (response != null) {
                    const token = response.Value;
                    document.querySelectorAll("input[name='sf_antiforgery']").forEach(i => i.value = token);
                    resolve();
                }
                else {
                    reject();
                }
            };
            xhr.onerror = function () { reject(); };
            xhr.send();
        });
    }
})();
