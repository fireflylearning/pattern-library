'use strict';

var React = require('React'),
    _ = require('underscore');

var ContainerControlBar = require("../../ff_container/ff_container-control-bar/ff_container-control-bar");
var ContainerControlBarSet = ContainerControlBar.ControlBarSet;
var Button = require("../../ff_module/ff_module-button/ff_module-button");
var DropdownButton = require("../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component");

var editButtonProps = { text: 'Edit', key: 'edit' },
    duplicateBtnProps = { text: 'Duplicate', key: 'duplicate' },
    exportBtnProps = { text: 'Export', key: 'export' },
    archiveBtnProps = { text: 'Archive', key: 'archive' },
    unArchiveBtnProps = { text: 'Unarchive', key: 'unarchive' },
    deleteBtnProps = { text: 'Delete', key: 'delete' };

function mergeProps(props) {
    var mergedExportProps = _.extend({}, exportBtnProps, { onClick: props.onExportClick }),
        mergedArchiveProps = _.extend({}, archiveBtnProps, { onClick: props.onArchiveClick }),
        mergedDeleteProps = _.extend({}, deleteBtnProps, { onClick: props.onDeleteClick }),
        mergedUnarchiveProps = _.extend({}, unArchiveBtnProps, { onClick: props.onUnarchiveClick });

        return {
            default: [
                mergedExportProps,
                mergedArchiveProps,
                mergedDeleteProps
            ],
            archived: [
                mergedExportProps,
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
    },
    render: function() {
        var editButton = this.props.state && this.props.state.archived ?
            '' :
            <Button modifier="tertiary" text={editButtonProps.text} key={editButtonProps.key} onClick={this.props.onEditClick} />;

        var dropDownActionList = getList(this.props);
        return (
            <ContainerControlBar modifier= "split">
                <ContainerControlBarSet>
                    {editButton}
                    <Button modifier="tertiary" text={duplicateBtnProps.text} key={duplicateBtnProps.key} onClick={this.props.onDuplicateClick} />
                    <DropdownButton modifier="tertiary" text="More Actions" list={getList(this.props)} />
                </ContainerControlBarSet>
            </ContainerControlBar>
        );
    }
})
