class ChatDataHandler {
    /**
     * @param {Object} chatData
     */
    constructor(chatData) {
        this.chatData = chatData;
    }

    get imageInfo() {
        return this.extractImageInfo();
    }

    extractImageInfo() {
        if (!this.hasAvailableImage()) {
            return {};
        }

        return this.getFromFileList();
    }

    getFromFileList() {
        const { url_private_download: downloadUrl } = this.chatData.files[0];

        if (!downloadUrl) {
            return {};
        }

        return { downloadUrl }
    }

    hasAvailableImage(chatData = this.chatData) {
        return !!(
            chatData &&
            chatData.files &&
            chatData.files.length > 0 &&
            chatData.upload
        );
    }
}

module.exports = ChatDataHandler;