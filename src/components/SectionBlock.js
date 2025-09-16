export default function SectionBlock({ title, children, bg = 'white', imageGrid, cta }) {
  return (
    <section className={`w-full pt-8 pb-12 px-4 md:px-0 ${bg === 'gray' ? 'bg-background' : 'bg-white'} rounded-xl`}>
      <div className="max-w-5xl mx-auto">
        {title && (
          <h2 className="font-heading text-3xl font-bold mb-8 text-primary text-center">
            {title}
          </h2>
        )}
        <div className="text-lg text-textdark mb-6 text-center">{children}</div>

        {imageGrid && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {imageGrid.map((img, i) => (
              <img key={i} src={img} alt="Section visual" className="rounded shadow" />
            ))}
          </div>
        )}
        {cta && <div className="flex justify-center mt-6">{cta}</div>}
      </div>
    </section>
  );
}
