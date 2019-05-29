import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {exists} from "../helpers/object";

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
                    <svg className="icon" viewBox="0 0 24 24">
                        <path
                            d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/>
                    </svg>
                </button>
            </CopyToClipboard>
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
