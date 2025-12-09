import About from "../components/About";
import FloatingChatbotButton from "../components/Chatbot/FloatingChatbotButton";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { getProjects } from "../components/Projects/ProjectActions";
import Projects from "../components/Projects/Projects";
import { getSettings } from "../components/SettingsActions";

const page = async () => {
  const projects = await getProjects();
  const settings = await getSettings();

  return (
    <>
      <Navbar settings={settings} isAdmin={true} />
      <main className="bg-base-200 min-h-screen text-base-content">
        <Hero settings={settings} />
        <About settings={settings} />
        <Projects projects={projects} isAdmin={true} />
        <Contact />
        <Footer settings={settings} />
      </main>
      <FloatingChatbotButton />
    </>
  );
};

export default page;
