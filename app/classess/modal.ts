export class Modal {
    private readonly id: string;

    public static modals: any[] = [];

    constructor(id: string = null) {
        const findModal = Modal.modals.find(x => x.id === id);
        if (findModal) {
            Modal.removeById(id);
        }

        Modal.modals.push(this);
        console.log("Modal.modals", Modal.modals);
        this.id = id || (Math.random() + Modal.modals.length).toString();
    }

    public open(template: string): void {

        const divWrap = document.createElement("div");
        divWrap.innerHTML = template;
        divWrap.id = this.id;
        divWrap.setAttribute('modal-id', this.id);
        divWrap.classList.add("modal-element");
        divWrap.addEventListener('click',this.closeModalHandler)
        document.body.appendChild(divWrap);
    };
    public remove() {
        const el = document.getElementById(this.id) as HTMLElement;
        if (el) {
            el.removeEventListener('click', this.closeModalHandler);
            el.parentNode.removeChild(el);
        }
    };
    public static removeById(id: string = null): void {
        let modalId = id;

        const findEl = Modal.modals.find(x => x.id === modalId);
        if (findEl) {
            findEl.remove();
            Modal.modals = Modal.modals.filter((el) => el.id !== modalId);
        }
        else {
            if (Array.isArray(Modal.modals)) {
                const lastEl = Modal.modals.pop();
                if (lastEl) {
                    lastEl.remove();
                }
            }
        }
    }
    public static removeAll() {
        if (Array.isArray(Modal.modals)) {
            Modal.modals.forEach((el) => {
                Modal.removeById(el.id);
            });
        }
    }

    private closeModalHandler = (ev: Event) => {
        const target = ev.target as HTMLElement;
        if (target.classList.contains('close-modal')) {
            this.remove();
        }
    }
}