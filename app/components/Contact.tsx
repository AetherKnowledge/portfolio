const Contact = () => {
  return (
    <section
      id="contact"
      className="px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-[1280px] mx-auto pb-[150px]"
    >
      {/* Left Text Section */}
      <div className="text-center md:text-left">
        <h3 className="text-2xl mb-4">Contacts</h3>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Have a project?</h2>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Let’s talk!</h2>
      </div>

      {/* Right Form Section */}
      <form className="space-y-4 w-full mx-auto md:mx-0">
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full"
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />
        <textarea
          placeholder="Message"
          className="textarea textarea-bordered w-full"
          rows={4}
        ></textarea>
        <button className="btn btn-primary text-md w-full">Submit</button>
      </form>
    </section>
  );
};

export default Contact;
