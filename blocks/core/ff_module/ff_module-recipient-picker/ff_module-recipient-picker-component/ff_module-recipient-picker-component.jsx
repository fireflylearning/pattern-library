'use strict';

var React = require('react');

var RecipientGroup = require('../../ff_module-form-box-group/ff_module-form-box-group'),
    RecipientMember = require('../../ff_module-form-box-member/ff_module-form-box-member'),
    RecipientButtonList = require('../ff_module-recipient-button-list/ff_module-recipient-button-list-component/ff_module-recipient-button-list-component');

var components = {};
components['groupprofile'] = RecipientGroup;
components['profile'] = RecipientMember;

var RecipientGroupContainer = function RecipientGroupContainer(props) {
    return (
        <li className="ff_module-recipient-picker-selected-list__item" key={props.key}>
            {props.children}
        </li>
    );
}

module.exports = function(){
    return (

        <div className="ff_module-recipient-picker"
            onClick={this.stopEventPropagation}>

            <div className="ff_module-recipient-picker__main" onClick={this.resetInput}>

                <ul className="ff_module-recipient-picker-selected-list" onClick={this.stopEventPropagation}>
                    {this.state.selected && this.state.selected.length > 0 ?
                        this.state.selected.map(recipient=>{
                            var Component = components[recipient.type] || RecipientMember;
                            return (
                                <RecipientGroupContainer key={recipient.guid}>
                                    <Component
                                        guid={recipient.guid}
                                        label={recipient.label}
                                        onExpand={()=>this.expandGroup(recipient.guid)}
                                        onDelete={()=>this.removeRecipientFromSelection(recipient.guid)} />
                                </RecipientGroupContainer>
                            );
                        }) : null}
                </ul>

                <input
                    className="ff_module-recipient-picker__input ff_module-form-input ff_module-form-input--invisible"
                    name="recipient-picker-query"
                    onChange={this.handleInputChange}
                    onClick={this.triggerClickHandler}
                    ref={function(ref){
                        //console.log(ref); TODO: Investigate why sometimes null
                        if(!ref) return;
                        this.textInput = ref; }.bind(this)}
                    />
            </div>

            <div className={"ff_module-recipient-picker__selectable" + (this.state.isActive ? ' ff_module-recipient-picker__selectable--is-active' : '')}>
                {this.state.hasResults === true ?
                    <RecipientButtonList
                        loaded={true}
                        results={this.state.results}
                        isSelected={this.checkIsSelected}
                        onSelect={this.addRecipientByResultId}
                        /> : null}

                {this.state.hasResults === false ? <p>No results available</p> : null}
            </div>
        </div>


    )
}
