/*global undefinedVariable:false Raven:false*/
/*eslint no-unused-vars:0 no-eval:0*/

import React, { Component } from 'react';
import logo from '../assets/sentry-glyph-black.png';

class Errors extends Component {
    constructor(props) {
        super(props);
        this.state = {color: 'black'};
        Raven.setTagsContext({page: "ErrorsPage"});
    }

    // ERRORS
    notAFunctionError() {
        var obj = {};
        obj.attributeInvalid();
    }

    uriError() {
        decodeURIComponent('%');
    }

    typeError() {
        null.f();
    }

    syntaxError() {
        eval('foo bar');
    }

    referenceError() {
        var a = undefinedVariable;
    }

    rangeError() {
        throw new RangeError('Parameter must be between 1 and 100');
    }

    evalError() {
        throw new EvalError('Hello', 'someFile.js', 10);
    }
    // ERRORS (end)

    showError(color) {
        var that = this;
        that.setState({color: color});
        setTimeout(function () {
            that.setState({color: 'black'});
        }, 1500);
    }

    // RAVEN CONFIGURATIONS:
    setSampleTag() {
        Raven.setTagsContext({sampleTag: "sampleValue"});
    }

    setExtraContext() {
        Raven.setExtraContext({ foo: "bar" });
    }
    // RAVEN CONFIGURATIONS (end)

    render() {
        const user = this.props.location.state;

        return (
            <div style={{
                color: this.state.color
            }}>
                <h2>Hi, {user
                        ? user.email
                        : "Guest"}.</h2>
                <p>Welcome the list of sample errors.
                    <br/>
                    This is where you can specify your DSN and send errors/exceptions to Sentry.</p>
                <div>
                    <ul className="left list-group " onClick={this.showError.bind(this, 'red')}>
                        <li className="list-group-item list-group-item-danger">
                            <h3>ERRORS</h3>
                        </li>
                        <li className="list-group-item" onClick={this.notAFunctionError}>
                            <h3>TypeError</h3>
                            <p>obj.attributeInvalid is not a function</p>
                        </li>
                        <li className="list-group-item" onClick={this.uriError}>
                            <h3>URIError</h3>
                            <p>URI malformed
                            </p>
                        </li>
                        <li className="list-group-item" onClick={this.typeError}>
                            <h3>Uncaught TypeError</h3>
                            <p>Cannot read property 'f' of null</p>
                        </li>
                        <li className="list-group-item" onClick={this.syntaxError}>
                            <h3>SyntaxError</h3>
                            <p>Unexpected identifier</p>
                        </li>
                        <li className="list-group-item" onClick={this.referenceError}>
                            <h3>ReferenceError</h3>
                            <p>undefinedVariable is not defined</p>
                        </li>
                        <li className="list-group-item" onClick={this.rangeError}>
                            <h3>RangeError</h3>
                            <p>Parameter must be between 1 and 100</p>
                        </li>
                        <li className="list-group-item" onClick={this.evalError}>
                            <h3>EvalError</h3>
                            <p>Hello</p>
                        </li>
                    </ul>

                    <ul className="left list-group" onClick={this.showError.bind(this, 'green')}>
                        <li className="list-group-item list-group-item-success">
                            <h3>FEATURES</h3>
                        </li>
                        <li className="list-group-item" onClick={this.setSampleTag}>
                            <h3>Set Sample Tag</h3>
                            <p>{'Raven.setTagsContext({sampleTag: "sampleValue"});'}</p>
                        </li>
                        <li className="list-group-item" onClick={this.setExtraContext}>
                            <h3>Set Sample Tag</h3>
                            <p>{'Raven.setExtraContext({foo: "bar"});'}</p>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}

export default Errors;
