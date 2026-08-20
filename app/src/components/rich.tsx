import type { JSX } from 'preact';

/**
 * Tiny formatter for card text: **bold**, `mono`, and newlines.
 * Deliberately not a markdown engine — card content is authored in-repo.
 */
export function Rich(props: { text: string; class?: string }): JSX.Element {
  const lines = props.text.split('\n');
  return (
    <span class={props.class}>
      {lines.map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {formatInline(line)}
        </span>
      ))}
    </span>
  );
}

function formatInline(text: string): (string | JSX.Element)[] {
  const out: (string | JSX.Element)[] = [];
  // split on **bold** or `mono`
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('**')) out.push(<b key={key++}>{tok.slice(2, -2)}</b>);
    else out.push(<code key={key++} class="mono">{tok.slice(1, -1)}</code>);
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
