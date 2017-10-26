'use strict';

var React = require('react'),
    _ = require('underscore');

var ContainerControlBar = require("../../ff_container/ff_container-control-bar/ff_container-control-bar");
var ContainerControlBarSet = ContainerControlBar.ControlBarSet;
var Button = require("../../ff_module/ff_module-button/ff_module-button");
var DropdownButton = require("../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component");

var editButtonProps = { text: 'Edit', key: 'edit' },
    continueEditingButtonProps = { text: 'Continue Editing', key: 'continue-editing' },
    duplicateBtnProps = { text: 'Copy', key: 'duplicate' },
    exportBtnProps = { text: 'Export all marks to Excel', key: 'export' },
    archiveBtnProps = { text: 'Archive', key: 'archive' },
    unArchiveBtnProps = { text: 'Unarchive', key: 'unarchive' },
    deleteBtnProps = { text: 'Delete', key: 'delete' },
    downloadBtnProps = { text: 'Download all student files', key: 'download' };

function mergeProps(props) {
    var mergedExportProps = _.extend({}, exportBtnProps, { onClick: props.onExportClick }),
        mergedArchiveProps = _.extend({}, archiveBtnProps, { onClick: props.onArchiveClick }),
        mergedDeleteProps = _.extend({}, deleteBtnProps, { onClick: props.onDeleteClick }),
        mergedUnarchiveProps = _.extend({}, unArchiveBtnProps, { onClick: props.onUnarchiveClick }),
        mergedDownloadProps = _.extend({}, downloadBtnProps, { onClick: props.onDownloadClick });

        return {
            default: [
                mergedExportProps,
                mergedDownloadProps,
                mergedArchiveProps,
                mergedDeleteProps
            ],
            archived: [
                mergedExportProps,
                mergedDownloadProps,
                mergedUnarchiveProps,
                mergedDeleteProps
            ]
        };
}


function getList(props) {
    var lists = mergeProps(props);

    if (props.state && props.state.archived) {
        return lists.archived;
    }
    return lists.default;
}


module.exports = React.createClass({
    displayName: 'TaskOverviewActions',
    propTypes: {
        state: React.PropTypes.object,
        onEditClick: React.PropTypes.func,
        onDuplicateClick: React.PropTypes.func,
        onExportClick: React.PropTypes.func,
        onArchiveClick: React.PropTypes.func,
        onUnarchiveClick: React.PropTypes.func,
        onDeleteClick: React.PropTypes.func,
        onDownloadClick: React.PropTypes.func
    },
    render: function() {
        let state = this.props.state || {};
        let buttonProps =  state.draft ? continueEditingButtonProps : editButtonProps;
        let buttonModifier = state.draft ? "primary" : "tertiary";

        let editButton = <Button modifier={buttonModifier} text={buttonProps.text} key={buttonProps.key} onClick={this.props.onEditClick} />;

        let additionalActions = state.draft ?
            <Button modifier="tertiary" text={deleteBtnProps.text} key={deleteBtnProps.key} onClick={this.props.onDeleteClick} /> :
                <DropdownButton modifier="tertiary" text="More Actions" list={getList(this.props)} />;

        return (
            <ContainerControlBar modifier="right" classes="ff_module-task-overview-actions">
                <ContainerControlBarSet>
                    {editButton}
                    <Button modifier="tertiary" text={duplicateBtnProps.text} key={duplicateBtnProps.key} onClick={this.props.onDuplicateClick} />
                    {additionalActions}
                </ContainerControlBarSet>
            </ContainerControlBar>
        );
    }
})
