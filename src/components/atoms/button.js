import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { colors, spacing, fonts, misc } from '../../tokens/'
import onlyOneOf from '../_helpers/only-one-of-validator'
import Icon from './icon'
import Spinner from './spinner'

const config = {
  default: {
    text: colors.base,
    background: colors.grayLightest,
    border: colors.grayLightest,
    hoverBackground: colors.grayLight,
    hoverBorder: colors.grayLight,
    focusBackground: colors.grayMedium,
    focusBorder: colors.grayMedium
  },
  primary: {
    text: colors.white,
    background: colors.base,
    border: colors.base,
    hoverBackground: colors.grayDark,
    hoverBorder: colors.grayDark,
    focusBackground: colors.grayMedium,
    focusBorder: colors.grayMedium
  },
  transparent: {
    text: colors.base,
    background: colors.white,
    border: colors.base,
    hoverBackground: colors.grayLightest,
    hoverBorder: colors.base,
    focusBackground: colors.grayMedium,
    focusBorder: colors.base
  },
  icon: {
    text: colors.base,
    background: colors.white,
    border: colors.white,
    hoverBackground: colors.grayLightest,
    hoverBorder: colors.grayLightest,
    focusBackground: colors.grayMedium,
    focusBorder: colors.grayMedium
  },
  disabled: {
    text: colors.grayMedium,
    background: colors.grayLightest,
    border: colors.grayLightest,
    hoverBackground: colors.grayLightest,
    hoverBorder: colors.grayLightest,
    focusBackground: colors.grayLightest,
    focusBorder: colors.grayLightest
  },
  destructive: {
    text: colors.white,
    background: colors.orange,
    border: colors.orange,
    hoverBackground: colors.orangeLighter,
    hoverBorder: colors.orangeLighter,
    focusBackground: colors.orangeLighest,
    focusBorder: colors.orangeLighest
  },
  loading: {
    text: colors.white,
    background: colors.green,
    border: colors.green,
    hoverBackground: colors.green,
    hoverBorder: colors.green,
    focusBackground: colors.green,
    focusBorder: colors.green
  },
  success: {
    text: colors.white,
    background: colors.green,
    border: colors.green,
    hoverBackground: colors.green,
    hoverBorder: colors.green,
    focusBackground: colors.green,
    focusBorder: colors.green
  }
}

const getAttributes = props => {
  let styles = null
  if (props.success) styles = config.success
  else if (props.primary) styles = config.primary
  else if (props.transparent) styles = config.transparent
  else if (props.icon) styles = config.icon
  else if (props.destructive) styles = config.destructive
  else if (props.disabled) styles = config.disabled
  else styles = config.default

  if (props.loading) {
    styles.background = styles.hoverBackground
    styles.focusBackground = styles.hoverBackground
    styles.border = styles.hoverBorder
    styles.focusBorder = styles.hoverBorder
  }

  return styles
}

const StyledButton = styled.button`
  min-width: ${props => (props.icon ? '40px' : '96px')};
  box-sizing: border-box;

  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13px;
  font-weight: ${fonts.weight.bold};

  background: ${props => getAttributes(props).background};
  border: 1px solid;
  border-color: ${props => getAttributes(props).border};
  border-radius: ${misc.radius};

  color: ${props => getAttributes(props).text};

  padding: ${spacing.xsmall} ${spacing.small};
  margin: ${spacing.xsmall};
  margin-left: 0;

  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: border-color ${misc.animationDuration}, background ${misc.animationDuration};

  &:hover {
    background: ${props => getAttributes(props).hoverBackground};
    border-color: ${props => getAttributes(props).hoverBorder};
  }
  &:focus {
    background: ${props => getAttributes(props).focusBackground};
    border-color: ${props => getAttributes(props).focusBorder};
    outline: none;
  }
`

const Button = ({ children, ...props }) => {
  let content = children
  if (props.success) content = <Icon type="success" />
  else if (props.loading) content = <Spinner inverse={props.primary} />

  if (props.icon) {
    return (
      <StyledButton {...props}>
        <Icon type={props.icon} />
      </StyledButton>
    )
  } else {
    return <StyledButton {...props}>{content}</StyledButton>
  }
}

Button.propTypes = {
  /** Use for primary call to action */
  primary: PropTypes.bool,
  /** Use for secondary call to action */
  transparent: PropTypes.bool,
  /** Disable button that does not validate constraint */
  disabled: PropTypes.bool,
  /** Use for destructive actions like delete */
  destructive: PropTypes.bool,

  /** Name of icon */
  icon: PropTypes.string,

  /** Loading state when waiting for an action to complete */
  loading: PropTypes.bool,
  /** Successful state when action is completed successfuly */
  success: PropTypes.bool,

  /** @ignore This is an internal prop only used for validation */
  _type: props => onlyOneOf(props, ['primary', 'transparent', 'disabled', 'destructive', 'icon'])
}

Button.defaultProps = {
  primary: false,
  transparent: false,
  destructive: false,
  icon: null,
  disabled: false,
  loading: false,
  success: false
}

export default Button
