import * as React from 'react';
import { Button } from './button';

const Semantify = require('react-semantify');
const Formsy = require('formsy-react');

interface FieldErrorProps {
  message: string
}

interface FormProps {
  onSubmit?: (data:any, resetForm:any, invalidateForm:any) => void,
  onValidSubmit?: (data:any, resetForm:any, invalidateForm:any) => void,
  onInvalidSubmit?: (data:any, resetForm:any, invalidateForm:any) => void,
  onValid?: () => void,
  onInvalid?: () => void,
  onChange?: (currentValues:any, isChanged:boolean) => void,
  className?: string
}

interface FieldProps {
  name: string,
  label: string,
  fieldClassName? :string,
  className?: string,
  placeholder?: string,
  value?: string|number,
  type?: string,
  validations?: string,
  validationError?: string,
  required?: boolean,
  disabled?: boolean,
  readOnly?: boolean
}

interface HiddenFieldProps {
  name: string,
  value: string
}

interface SubmitButtonProps {
  text: string,
  disabled?: boolean,
  className?: string,
  loading?: boolean
}

const InputMixin = {
  getInitialState: function(){
    return {
      id: Date.now() + (Math.random() * 10000)
    }
  },
  changeValue: function(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  }
}

const FieldError = React.createClass<FieldErrorProps, any>({
  render: function(){
    return (
      <div className="ui basic red pointing prompt label transition visible">
        {this.props.message}
      </div>
    );
  }
});

export const SubmitButtonControlMixin = {
  getInitialState() {
    return {
      disableSubmit: true
    };
  },
  enableButton() {
    this.state.disableSubmit = false;
    this.setState(this.state);
  },
  disableButton() {
    this.state.disableSubmit = true;
    this.setState(this.state);
  }
}

export const Form = React.createClass<FormProps, any>({
  render: function(){
    return (
      <Formsy.Form {...this.props} className={`ui form ${this.props.className || ""}`}>
        {this.props.children}
      </Formsy.Form>
    );
  }
});

export const Field = React.createClass<any, any>({
  render: function() {
    return (
      <Semantify.Field {...this.props} />
    );
  }
});

export const InputField = React.createClass<FieldProps, any>({
  mixins: [Formsy.Mixin, InputMixin],
  render: function() {
    const errorMessage = this.getErrorMessage();
    const errorClass = errorMessage ? 'error' : '';
    var errorComp = (<div></div>);
    if (errorMessage) {
      errorComp = (
        <FieldError message={errorMessage} />
      )
    }
    return (
      <Field className={`${errorClass} ${this.props.filedClassName}`}>
        <label htmlFor={this.state.id}>{this.props.label}</label>
        <Semantify.Input
          {...this.props}
          id={this.state.id}
          type={this.props.type || 'text'}
          onChange={this.changeValue} />
        {errorComp}
      </Field>
    );
  }
});

export const HiddenField = React.createClass<HiddenFieldProps, any>({
  mixins: [Formsy.Mixin, InputMixin],
  render: function() {
    return (
      <Semantify.Input
        {...this.props}
        type="hidden"
        onChange={this.changeValue} />
    )
  }
});

export const CheckboxField = React.createClass<FieldProps, any>({
  mixins: [Formsy.Mixin, InputMixin],
  onChecked: function() {
    this.setValue(true);
  },
  onUnchecked: function() {
    this.setValue(false);
  },
  render: function() {
    return (
      <Field className={`inline ${this.props.filedClassName}`}>
        <Semantify.Checkbox
          init={{onChecked: this.onChecked, onUnchecked: this.onUnchecked}}
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}>
          <input type="checkbox" name={this.props.name} id={this.state.id} />
          <label htmlFor={this.state.id}>{this.props.label}</label>
        </Semantify.Checkbox>
      </Field>
    );
  }
});

export const SubmitButton = React.createClass<SubmitButtonProps, any>({
  render: function() {
    const loadingClass:string = this.props.loading ? 'loading' : '';
    return (
      <Button
        {...this.props}
        className={`${this.props.className} ${loadingClass}`}
        type="submit">
        {this.props.text}
      </Button>
    );
  }
});
