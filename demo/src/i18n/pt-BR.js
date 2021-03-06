export default {
    id: "pt-BR",
    messages: {
        lang: {
            en: "Inglês",
            "pt-BR": "Português (Brasil)"
        },
        example: {
            simple: "Isto é uma mensagem simples.",
            wrapped: "Essa mensagem está envolvida em uma tag <p/>.",
            withLocalParameters: "Parametro local: ${foo.bar}",
            withGlobalParameters: "Qual a plataforma que o browser está executando? ${navigator.platform}.",
            withNestedMessage: "O valor da chave \"example.simple\" é igual a: ${getMessage('example.simple')}",
            withNestedMessageWithParameters: "O valor da chave \"example.withLocalParameters\" é igual a: ${getMessage('example.withLocalParameters', params)}",
            composite: [
                "Isto é a mensagem do index 0",
                "Isto é a mensagem do index 1",
                "Isto é a mensagem do index 2",
            ],
            withHtmlTag: "Esta mensagem tem uma <strong>tag HTML<strong/>.",
            multipleIds: "Esta mensagem é exibida porque não foi encontrado uma mensagen com o id igual a \"example.message1\" ou \"example.message2\".",
            multipleIdsWithParameters: "Olá ${name}! Esta mensagem é exibida porque não foi encontrado uma a mensagen com o id igual a \"example.message1\"."
        },
    }
};
