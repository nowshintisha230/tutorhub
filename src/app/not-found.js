// app/not-found.js

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: '#fff',
      fontFamily: 'sans-serif',
    }}>

      <h1 style={{
        fontSize: '96px',
        fontWeight: '800',
        color: '#111',
        margin: '0',
        lineHeight: 1,
      }}>
        404
      </h1>

      <h2 style={{
        fontSize: '22px',
        fontWeight: '600',
        color: '#333',
        margin: '16px 0 8px',
      }}>
        Page Not Found
      </h2>

      <p style={{
        fontSize: '15px',
        color: '#888',
        maxWidth: '320px',
        lineHeight: 1.6,
        margin: '0 0 32px',
      }}>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link href="/" style={{
        backgroundColor: '#111',
        color: '#fff',
        padding: '12px 28px',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '500',
        textDecoration: 'none',
      }}>
        Back to Home
      </Link>

    </div>
  );
}