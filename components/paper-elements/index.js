import { html } from 'lit-html/lib/lit-extended';
import { repeat } from 'lit-html/lib/repeat';

export function textbox({
    type = 'single line',
    required = false,
} = { }) {
    return (f, id, v, set) => {
        if (type === 'multi line') {
            return html`<paper-textarea 
                            label="${f.title}"
                            type="${type}"
                            value="${v}"
                            required?="${required}"
                            auto-validate
                            on-value-changed="${e => set(e.target.value)}" >`;
        }

        return html`<paper-input 
                        label="${f.title}"
                        type="${type}"
                        value="${v}"
                        required?="${required}"
                        auto-validate
                        on-value-changed="${e => set(e.target.value)}" >`;
    };
}

export function dropdown({
    items = [],
} = {}) {
    return async (f, id, v, set) => {
        function getValue(el) {
            return el.querySelector('paper-listbox').selected;
        }

        let options = items;
        if (typeof items === 'function') {
            options = await items(f);
        }

        return html`<paper-dropdown-menu label="${f.title}" 
                                         no-animations?="${!window.KeyframeEffect}"
                                         on-value-changed="${e => set(getValue(e.target))}">
  <paper-listbox slot="dropdown-content" attr-for-selected="value">
    ${repeat(options, option => html`<paper-item value="${option.value}">${option.label}</paper-item>`)}
  </paper-listbox>
</paper-dropdown-menu>`;
    };
}
