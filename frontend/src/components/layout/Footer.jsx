import { APP_NAME } from '../../utils/constants';

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{
        marginTop: 60,
        padding: '32px 0',
        textAlign: 'center',
        color: 'var(--text-soft)',
        fontSize: 14,
        borderTop: '1px solid var(--border)',
      }}
    >
      <p style={{ fontWeight: 700, marginBottom: 6 }}>{APP_NAME}</p>
      <p>Identify your skill gap. Build your future.</p>
      <p style={{ marginTop: 6 }}>Contact: support@skillgapagent.app</p>
    </footer>
  );
}
