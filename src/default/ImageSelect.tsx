import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
import { lighten } from 'polished'
import { withFormControl, checkboxHandler } from '../.'
import { type value, type setValue, type fullTheme } from '../typings'


/**
 * A list of selectable options, where each one is represented by an image and
 * text.
 */
const ImageSelect = ({
  name,
  value,
  mandatory,
  setValue,
  options,
  multiple,
}: ImageSelectProps) => {
  const classes = useStyles()
  return (
    <div className={classes.ImageSelect}>
      {options.map((option, index: number) => {
        const checked = (value && multiple ? value.includes(option.value) : value === option.value)
        return (
          <div
            key={index}
            className={classNames(classes.input, { [classes.isChecked]: checked })}
            onClick={() => {
              const finalValue = multiple ? checkboxHandler(!checked, option.value, value) : option.value
              setValue(name, finalValue, mandatory, { touched: true })
            }}
          >
            <img src={option.image} alt='' />
            {option.label && <span className={classes.label}>{option.label}</span>}
          </div>
        )
      })}
    </div>
  )
}

export interface ImageSelectProps {
  name: string,
  value: value,
  mandatory: boolean,
  setValue: setValue,
  options: { image: string, label: string, value: string }[],
  multiple?: boolean,
}

const useStyles = createUseStyles((theme: fullTheme) => ({
  ImageSelect: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  input: {
    flex: '65px 0 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 9,
    lineHeight: 'normal',
    marginBottom: 8,
    color: theme.colors.inputText,
    cursor: 'pointer',
    position: 'relative',
    zIndex: 1,
  },
  label: {
    marginTop: 4,
    paddingBottom: 2,
  },
  isChecked: {
    '&:before': {
      content: '""',
      position: 'absolute',
      top: -5,
      right: 1,
      bottom: -5,
      left: 1,
      backgroundColor: lighten(0.6, theme.colors.accent),
      border: `2px solid ${theme.colors.accent}`,
      borderRadius: theme.sizes.borderRadius,
      zIndex: -1,
    },
  },
}))

export default withFormControl(ImageSelect)
