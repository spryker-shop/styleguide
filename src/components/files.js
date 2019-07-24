import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {exists} from "../helpers/object";
import IconCopy from "../icons/copy.svg";
import IconPHPStorm from "../icons/phpstorm.svg";
import IconVSCode from "../icons/visual-studio-code.svg";

export default class extends React.Component {
    listItem = (name, path, relativePath) => (
        <li key={name}>
            {name}
            <CopyToClipboard text={relativePath}>
                <button
                    className={`button is-small files__button files__button--${name.replace(/[A-z-]+\./gi, '')}`}
                    title="Copy the file path">
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
        const {twig, sass, typescript, name, path, relativePath} = this.props.files;
        const listOfFiles = [twig, sass, typescript];

        return (
            <div className="content files">
                <h3 className="title is-size-4">Files</h3>
                <ul className="list-marked">
                    {exists(this.props.files, 'twig') && (
                        listOfFiles.map(file => {
                            if (file === null || !file.exists) {
                                return false;
                            }

                            return this.listItem(file.name, file.path, file.relativePath)
                        }
                    ))}
                    {exists(this.props.files, 'exists') && (this.listItem(name, path, relativePath))}
                </ul>
            </div>
        )
    }
}
