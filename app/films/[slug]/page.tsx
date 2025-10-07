export default function FilmPage({ params }: { params: { slug: string } }) {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ margin: 0 }}>Film: {params.slug}</h1>
      <p style={{ opacity: 0.7 }}>Coming soon. This page will show film details, trailer, and links to mint.</p>
    </main>
  );
}


