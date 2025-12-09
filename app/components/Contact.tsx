const Contact = () => {
  return (
    <section
      id="contact"
      className="px-6 md:px-12 py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-[1280px] mx-auto pb-[150px]"
    >
      {/* Left Text Section */}
      <div className="text-center md:text-left space-y-6">
        <h3 className="text-xl font-semibold text-primary uppercase tracking-wider">
          Get In Touch
        </h3>
        <h2 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Have a project?
        </h2>
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Let's talk!
        </h2>
        <p className="text-lg text-base-content/70 max-w-md">
          I'm always interested in hearing about new projects and opportunities.
        </p>
      </div>

      {/* Right Form Section */}
      <form className="space-y-6 w-full mx-auto md:mx-0 backdrop-blur-sm bg-base-100/50 p-8 rounded-3xl border border-base-300/50 shadow-xl">
        <input
          type="text"
          placeholder="Your Name"
          className="input input-bordered w-full input-lg focus:input-primary transition-all"
          required
        />
        <input
          type="email"
          placeholder="your.email@example.com"
          className="input input-bordered w-full input-lg focus:input-primary transition-all"
          required
        />
        <textarea
          placeholder="Tell me about your project..."
          className="textarea textarea-bordered w-full textarea-lg focus:textarea-primary transition-all min-h-32"
          rows={5}
          required
        ></textarea>
        <button className="btn btn-primary btn-lg w-full shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all gap-2">
          <span>Send Message</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
    </section>
  );
};

export default Contact;
