import React, { useState } from "react";
import { Provider, SearchField, ActionButton, Avatar, Divider } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import AISummaryPrototype from "./AISummaryPrototype";
import Home from "@react-spectrum/s2/icons/Home";
import ChevronRight from "@react-spectrum/s2/icons/ChevronRight";
import "@react-spectrum/s2/page.css";
import "./HelpArticleDemo.css";

const HelpArticleDemo: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Provider background="base">
      <div className="help-page-layout">
        {/* Top Navigation */}
        <header className="top-nav">
          <div className="top-nav-content">
            <div className="top-nav-left">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="6" fill="#EB1000"/>
                <text x="18" y="25" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Arial">Ac</text>
              </svg>
              <span className="product-name">Acrobat</span>
            </div>
            <div className="top-nav-center">
              <SearchField 
                value={searchValue}
                onChange={setSearchValue}
                aria-label="Search Help"
                placeholder="Search Help..."
                UNSAFE_className="help-search"
              />
            </div>
            <div className="top-nav-right">
              <ActionButton isQuiet aria-label="Sign in">
                Sign in
              </ActionButton>
              <Avatar />
            </div>
          </div>
        </header>

        {/* Left Sidebar Navigation */}
        <aside className="left-nav">
          <nav className="nav-menu">
            <div className="nav-section">
              <a href="#" className="nav-item">
                <Home />
                <span>Home</span>
              </a>
              <Divider />
            </div>
            
            <div className="nav-section">
              <div className="nav-section-title">Get started</div>
              <a href="#" className="nav-item">Learn the basics</a>
              <a href="#" className="nav-item">Access the app</a>
              <a href="#" className="nav-item">Preferences and settings</a>
            </div>

            <div className="nav-section">
              <div className="nav-section-title">Use Acrobat</div>
              <a href="#" className="nav-item">Create documents</a>
              <a href="#" className="nav-item">Edit documents</a>
              <a href="#" className="nav-item">E-sign documents</a>
              <a href="#" className="nav-item">Share and review</a>
              <a href="#" className="nav-item">Print documents</a>
            </div>

            <div className="nav-section">
              <div className="nav-section-title">Troubleshoot</div>
              <a href="#" className="nav-item">Install and update issues</a>
              <a href="#" className="nav-item">Performance issues</a>
              <a href="#" className="nav-item active">Print and scan issues</a>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          <div
            className={style({
              maxWidth: "[1200px]",
              marginX: "auto",
              paddingX: "[24px]",
              paddingY: "[40px]",
            })}
          >
        {/* Breadcrumb */}
        <nav
          className={style({
            marginBottom: 16,
          })}
        >
          <ul
            className={style({
              display: "flex",
              gap: 8,
              listStyle: "none",
              padding: 0,
              margin: 0,
              font: "body-sm",
              color: "neutral-subdued",
            })}
          >
            <li>Acrobat Desktop Help</li>
            <li>/</li>
            <li>Troubleshoot</li>
            <li>/</li>
            <li>Print and scan issues</li>
          </ul>
        </nav>

        {/* Article Header */}
        <header
          className={style({
            marginBottom: 24,
          })}
        >
          <h1
            className={style({
              font: "heading-2xl",
              fontWeight: "extra-bold",
              color: "heading",
              marginTop: 0,
              marginBottom: 16,
            })}
          >
            Error while printing PDFs in Acrobat
          </h1>

          <p
            className={style({
              font: "body",
              color: "neutral-subdued",
              margin: 0,
            })}
          >
            Last updated on Sep 23, 2025
          </p>
        </header>

        {/* AI Summary Component */}
        <AISummaryPrototype />

        {/* Article Description */}
        <div
          className={style({
            marginBottom: 40,
          })}
        >
          <p
            className={style({
              font: "title",
              fontWeight: "bold",
              color: "body",
            })}
          >
            Learn how to troubleshoot printing errors in Adobe Acrobat.
          </p>
        </div>

        {/* Article Content */}
        <div
          className={style({
            display: "flex",
            flexDirection: "column",
            gap: 32,
          })}
        >
          {/* Section 1 */}
          <section id="acrobat-not-updated">
            <h2
              className={style({
                font: "heading-lg",
                fontWeight: "bold",
                color: "heading",
                marginTop: 0,
                marginBottom: 16,
              })}
            >
              Acrobat isn't updated
            </h2>
            <ol
              className={style({
                font: "body",
                color: "body",
                paddingLeft: 24,
              })}
            >
              <li>Open Acrobat.</li>
              <li>
                Select <strong>Menu {">"} Help {">"} Check for updates</strong>{" "}
                (Windows) or <strong>Help {">"} Check for updates</strong> (macOS).
              </li>
              <li>Install available updates and restart Acrobat.</li>
            </ol>
          </section>

          {/* Section 2 */}
          <section id="printer-connection">
            <h2
              className={style({
                font: "heading-lg",
                fontWeight: "bold",
                color: "heading",
                marginTop: 0,
                marginBottom: 16,
              })}
            >
              Printer connection or hardware issue
            </h2>
            <p
              className={style({
                font: "body",
                color: "body",
                marginTop: 0,
                marginBottom: 16,
              })}
            >
              Ensure that your printer is properly connected to the system via a USB
              cable. Print a test page. If the printer fails to respond, check that
              the printer cable is firmly connected to your computer. For better
              performance, connect the printer directly to a USB port on your
              computer rather than through a USB hub.
            </p>
            <p
              className={style({
                font: "body",
                color: "body",
                margin: 0,
              })}
            >
              If issues persist, turn the printer off, wait for 30 seconds, and then
              turn it back on. This process can often reset the printer's internal
              systems and resolve minor glitches. After completing these steps,
              attempt to print your PDF again. These simple checks can often resolve
              common printer connectivity issues and ensure your hardware is
              functioning correctly.
            </p>
          </section>

          {/* Section 3 */}
          <section id="outdated-drivers">
            <h2
              className={style({
                font: "heading-lg",
                fontWeight: "bold",
                color: "heading",
                marginTop: 0,
                marginBottom: 16,
              })}
            >
              Outdated drivers
            </h2>
            <p
              className={style({
                font: "body",
                color: "body",
                margin: 0,
              })}
            >
              Ensure your printer is using the most up-to-date software. Visit your
              printer manufacturer's website and locate the drivers section. Search
              for and download the latest drivers specifically for your model. Once
              downloaded, install these updated drivers on your computer. After
              installation, restart your computer and launch Adobe Acrobat. Attempt
              to connect to your printer again.
            </p>
          </section>

          {/* Section 4 */}
          <section id="printer-specific">
            <h2
              className={style({
                font: "heading-lg",
                fontWeight: "bold",
                color: "heading",
                marginTop: 0,
                marginBottom: 16,
              })}
            >
              Printer-specific issue
            </h2>
            <p
              className={style({
                font: "body",
                color: "body",
                marginBottom: 12,
              })}
            >
              Test printing to a different printer to determine whether the problem
              is with the current device. Switch to another printer if available. To
              change the default printer:
            </p>
            <ul
              className={style({
                font: "body",
                color: "body",
                paddingLeft: 24,
              })}
            >
              <li>
                <strong>Windows:</strong> Change the default printer – Microsoft Help
              </li>
              <li>
                <strong>macOS:</strong> Change the default printer – Apple Support
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="corrupt-pdf">
            <h2
              className={style({
                font: "heading-lg",
                fontWeight: "bold",
                color: "heading",
                marginTop: 0,
                marginBottom: 16,
              })}
            >
              Corrupt or problematic PDF file
            </h2>

            <h3
              className={style({
                font: "heading",
                fontWeight: "bold",
                color: "heading",
                marginTop: 24,
                marginBottom: 12,
              })}
            >
              Print as image
            </h3>
            <ol
              className={style({
                font: "body",
                color: "body",
                paddingLeft: 24,
                marginBottom: 24,
              })}
            >
              <li>Open Acrobat.</li>
              <li>
                Select <strong>Print this file</strong> from the top bar.
              </li>
              <li>
                In the Print dialog box, select <strong>Advanced</strong>.
              </li>
              <li>
                Select <strong>Print as Image</strong>.
              </li>
              <li>
                Select <strong>OK</strong> and then select <strong>Print</strong>.
              </li>
            </ol>

            <h3
              className={style({
                font: "heading",
                fontWeight: "bold",
                color: "heading",
                marginTop: 24,
                marginBottom: 12,
              })}
            >
              Download or copy the PDF again
            </h3>
            <p
              className={style({
                font: "body",
                color: "body",
                margin: 0,
              })}
            >
              Save the PDF directly to your hard drive, not a USB or network drive.
              Open the PDF in Acrobat and print the saved file.
            </p>

            <h3
              className={style({
                font: "heading",
                fontWeight: "bold",
                color: "heading",
                marginTop: 24,
                marginBottom: 12,
              })}
            >
              Save As a new copy
            </h3>
            <ol
              className={style({
                font: "body",
                color: "body",
                paddingLeft: 24,
              })}
            >
              <li>Open Acrobat.</li>
              <li>
                Select <strong>Menu {">"} File {">"} Save As</strong> (Windows) or{" "}
                <strong>File {">"} Save As</strong> (macOS).
              </li>
              <li>Rename the file using only letters and numbers.</li>
              <li>Open the saved file in Acrobat.</li>
              <li>
                Select <strong>Print this file</strong> from the top bar.
              </li>
              <li>
                Select <strong>Print</strong>.
              </li>
            </ol>
          </section>

          {/* More space for scrolling */}
          <div className={style({ height: "[800px]" })} />
        </div>
      </div>
        </main>
      </div>
    </Provider>
  );
};

export default HelpArticleDemo;

