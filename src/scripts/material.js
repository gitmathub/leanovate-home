import { MDCTextField } from '@material/textfield'
import {MDCRipple} from '@material/ripple'

document.querySelectorAll('.mdc-text-field').forEach(node => new MDCTextField(node))
document.querySelectorAll('.mdc-button').forEach(node => new MDCRipple(node))
