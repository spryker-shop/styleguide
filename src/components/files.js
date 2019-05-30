import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {exists} from "../helpers/object";
import IconCopy from "../icons/copy.svg";
import IconPHPStorm from "../icons/phpstorm.svg";
import IconVSCode from "../icons/visual-studio-code.svg";

export default class extends React.Component {
    parsePath = (path) => {
        const startIndex = path.indexOf('project');
        return `/${path.slice(startIndex)}`;
    };

    listItem = (name, path) => (
        <li key={name}>
            {name}
            <CopyToClipboard text={this.parsePath(path)}>
                <button
                    className={`button is-small files__button files__button--${name.replace(/[A-z-]+\./gi, '')}`}
                    title="Copy path of the file">
                    <IconCopy className="icon" />
                </button>
            </CopyToClipboard>
            <a href={`phpstorm://open?file=${path}`} className="button is-small files__button files__button--second" title="Open the file in PhpStorm">
                <IconPHPStorm className="icon" />
            </a>
            <a href={`vscode://file/${path}`} className="button is-small files__button files__button--second" title="Open the file in Visual Studio Code">
                <IconVSCode className="icon" />
            </a>
        </li>
    );

    render() {
        const {twig, sass, typescript, name, path} = this.props.files;
        const listOfFiles = [twig, sass, typescript];

        return (
            <div className="content files">
                <h3 className="title is-size-4">Files</h3>
                <ul>
                    {exists(this.props.files, 'twig') && (
                        listOfFiles.map((file) => {
                            if (!file.exists) {
                                return false;
                            }

                            return this.listItem(file.name, file.path)
                        }
                    ))}
                    {exists(this.props.files, 'exists') && (this.listItem(name, path))}
                </ul>
            </div>
        )
    }
}
