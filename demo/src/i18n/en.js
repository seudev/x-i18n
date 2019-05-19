export default {
    id: "en",
    messages: {
        lang: {
            en: "English",
            'pt-BR': "Portuguese (Brazil)"
        },
        example: {
            simple: "This is a simple message.",
            wrapped: "This message is wrapped in a <p/> tag.",
            withLocalParameters: "Local parameter: ${foo.bar}",
            withGlobalParameters: "What is the platform that the browser is running? ${navigator.platform}.",
            withNestedMessage: "The value of the key \"example.simple\" is equals to: ${getMessage('example.simple')}",
            withNestedMessageWithParameters: "The value of the key \"example.withLocalParameters\" is equals to: ${getMessage('example.withLocalParameters', params)}",
            composite: [
                "This is the message from index 0",
                "This is the message from index 1",
                "This is the message from index 2"
            ],
            fallback: "This message was defined only in english.",
            withHtmlTag: "This message has a <strong>HTML tag<strong/>."
        },
    }
};
