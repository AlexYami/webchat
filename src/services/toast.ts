enum ToastType {
    Error = 1,
    Info = 2,
}

const DEFAULT_ERROR_MESSAGE = "Произошла неивестная ошибка";

function getElement(): HTMLElement {
    return document.querySelector("#toast")!;
}

function getClassName(type: ToastType): string {
    switch (type) {
        case ToastType.Error:
            return "toast--error";
        case ToastType.Info:
            return "toast--info";
    }

    return "";
}

function show(message: string, type: ToastType): void {
    const toast = getElement();

    toast.className = getClassName(type);
    toast.textContent = message;
    toast.style.visibility = "visible";
    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";

        setTimeout(() => {
            toast.textContent = "";
            toast.style.visibility = "hidden";
        }, 500);
    }, 3000);
}

export function info(message: string): void {
    show(message, ToastType.Info);
}

export function error(message: string = DEFAULT_ERROR_MESSAGE): void {
    show(message, ToastType.Error);
}
