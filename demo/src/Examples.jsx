import React from 'react';

import { Message } from '../../src';

const Example = props => (
    <section>
        <h3>{props.title}</h3>
        <details open={true}>
            <summary>
                <code>
                    {`<Message
                        ${props.rawHtml ? "rawHtml " : ''}
                        ${props.as ? `as="${props.as}" ` : ''}
                        id=${(props.id instanceof Array) ? `{[${props.id.map(id => `"${id}"`)}]}` : `"${props.id}"`}
                        ${props.params ? `params={${JSON.stringify(props.params)}} ` : ''}
                        ${props.default ? `default="${props.default}" ` : ''}
                    />`}
                </code>
            </summary>
            <div className="result">
                <Message {...props} />
            </div>
        </details>
    </section>
);

export default props => (
    <div id="examples">
        <h2>Examples</h2>
        <Example title="Simple message" id="example.simple" />
        <Example title="Wrapped message" as="p" id="example.wrapped" />
        <Example title="Message with local parameters" id="example.withLocalParameters" params={{ foo: { bar: "Foo bar" } }} />
        <Example title="Message with global parameters" id="example.withGlobalParameters" />
        <Example title="Nested message" id="example.withNestedMessage" />
        <Example title="Nested message with parameters" id="example.withNestedMessageWithParameters" params={{ foo: { bar: "Hello" } }} />
        <Example title="Composite message" as="p" id="example.composite" />
        <Example title="Index 1 from composite message" id="example.composite[1]" />
        <Example title="Composite message wrapped in <p/> tag" as="p" id="example.composite" />
        <Example title="Message of fallback lang" id="example.fallback" />
        <Example title="Message with html tag" as="div" id="example.withHtmlTag" rawHtml />
        <Example title="Default message" id="example.defaultMessage" default="This is the default message" />
        <Example title="Multiple keys" id={["example.message1", "example.message2", "example.multipleIds"]} />
        <Example title="Multiple keys with default value" id={["example.message1", "example.message2", "example.message3"]} default="This is the default message" />
        <Example title="Multiple keys with parameters" id={["example.message1", "example.multipleIdsWithParameters"]} params={{ name: "Jhonny" }} />
    </div>
);
