export class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
        // Item 9: precisa de referência ao <img> do avatar para poder trocá-lo.
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent
        };
    }

    // Item 1/9: agora também recebe (opcionalmente) o link do avatar.
    setUserInfo({ name, job, avatar }) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = job;
        if (avatar) {
            this._avatarElement.src = avatar;
        }
    }
}