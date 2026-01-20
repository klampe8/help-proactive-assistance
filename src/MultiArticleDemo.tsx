import React, { useState } from "react";
import { Provider, Picker, PickerItem, ActionButton } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { articles, Article } from "./articlesData";
import AISummaryPrototype from "./AISummaryPrototype";
import ChevronLeft from "@react-spectrum/s2/icons/ChevronLeft";
import ChevronRight from "@react-spectrum/s2/icons/ChevronRight";
import "@react-spectrum/s2/page.css";
import "./HelpArticleDemo.css";
import "./MultiArticleDemo.css";

const MultiArticleDemo: React.FC = () => {
  // Get article ID from URL params, or default to first article
  const urlParams = new URLSearchParams(window.location.search);
  const initialArticleId = urlParams.get('article') || articles[0].id;
  
  const [selectedArticle, setSelectedArticle] = useState<Article>(
    articles.find(a => a.id === initialArticleId) || articles[0]
  );

  const handleArticleChange = (articleId: string) => {
    const article = articles.find(a => a.id === articleId);
    if (article) {
      setSelectedArticle(article);
      // Update URL without reload
      window.history.pushState({}, '', `?article=${articleId}`);
    }
  };

  const goToPrevious = () => {
    const currentIndex = articles.indexOf(selectedArticle);
    if (currentIndex > 0) {
      handleArticleChange(articles[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    const currentIndex = articles.indexOf(selectedArticle);
    if (currentIndex < articles.length - 1) {
      handleArticleChange(articles[currentIndex + 1].id);
    }
  };

  const currentIndex = articles.indexOf(selectedArticle);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < articles.length - 1;

  // Group articles by product
  const acrobatArticles = articles.filter(a => a.product === "Acrobat");
  const photoshopArticles = articles.filter(a => a.product === "Photoshop");

  return (
    <Provider background="base">
      {/* Demo Control Panel - separate from Help UI */}
      <div className="demo-control-panel">
        <div className="demo-controls">
          <span className="demo-label">🎨 Prototype Navigation:</span>
          
          <ActionButton 
            onPress={goToPrevious} 
            isDisabled={!canGoPrevious}
            size="S"
            aria-label="Previous article"
          >
            <ChevronLeft />
          </ActionButton>
          
          <select
            value={selectedArticle.id}
            onChange={(e) => handleArticleChange(e.target.value)}
            className="demo-picker"
          >
            <optgroup label="Acrobat Articles">
              {acrobatArticles.map(article => (
                <option key={article.id} value={article.id}>
                  {article.title}
                </option>
              ))}
            </optgroup>
            <optgroup label="Photoshop Articles">
              {photoshopArticles.map(article => (
                <option key={article.id} value={article.id}>
                  {article.title}
                </option>
              ))}
            </optgroup>
          </select>
          
          <ActionButton 
            onPress={goToNext} 
            isDisabled={!canGoNext}
            size="S"
            aria-label="Next article"
          >
            <ChevronRight />
          </ActionButton>

          <span className="demo-counter">
            {currentIndex + 1} / {articles.length}
          </span>
        </div>
      </div>

      <div className="help-page-layout">
        {/* Top Navigation */}
        <header className="top-nav">
          <div className="top-nav-content">
            <div className="top-nav-left">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="6" fill="#EB1000"/>
                <text x="18" y="25" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Arial">
                  {selectedArticle.product === "Acrobat" ? "Ac" : "Ps"}
                </text>
              </svg>
              <span className="product-name">{selectedArticle.product}</span>
            </div>
            
          </div>
        </header>

        <div className="page-body">
          {/* Left Sidebar Navigation */}
          <aside className="left-nav">
            <nav className="nav-menu">
              <div className="nav-section">
                <div className="nav-section-title">{selectedArticle.product} Help</div>
                <div className="nav-item active">
                  {selectedArticle.category}
                </div>
              </div>

              <div className="nav-section">
                <div className="nav-section-title">Quick Links</div>
                {articles.filter(a => a.product === selectedArticle.product).map(article => (
                  <button
                    key={article.id}
                    onClick={() => handleArticleChange(article.id)}
                    className={`nav-item-button ${article.id === selectedArticle.id ? 'active' : ''}`}
                  >
                    {article.title}
                  </button>
                ))}
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="main-content">
            <div className={style({ maxWidth: "[1200px]", marginX: "auto", paddingX: "[24px]", paddingY: "[40px]" })}>
            {/* Breadcrumb */}
            <nav className={style({ marginBottom: "[16px]" })}>
              <ul className="breadcrumb">
                <li>{selectedArticle.product} Help</li>
                <li>/</li>
                <li>{selectedArticle.category}</li>
              </ul>
            </nav>

            {/* Article Header */}
            <header className={style({ marginBottom: "[24px]" })}>
              <h1 className="article-title">{selectedArticle.title}</h1>
              <p className="article-meta">Last updated on Dec 3, 2024</p>
            </header>

            {/* AI Summary Component */}
            <AISummaryPrototype
              summaryText={selectedArticle.summaryText}
              summaryLinks={selectedArticle.summaryLinks}
              questions={selectedArticle.questions}
            />

            {/* Article Description */}
            <div className={style({ marginBottom: "[40px]" })}>
              <p className="article-intro">
                Learn how to {selectedArticle.title.toLowerCase()}.
              </p>
            </div>

            {/* Article Content */}
            <div className="article-content">
              {selectedArticle.id === "acrobat-printing-errors" && (
                <>
                  <section id="acrobat-not-updated">
                    <h2>Acrobat isn't updated</h2>
                    <ol>
                      <li>Open Acrobat.</li>
                      <li>Select <strong>Menu {">"} Help {">"} Check for updates</strong> (Windows) or <strong>Help {">"} Check for updates</strong> (macOS).</li>
                      <li>Install available updates and restart Acrobat.</li>
                    </ol>
                  </section>

                  <section id="printer-connection">
                    <h2>Printer connection or hardware issue</h2>
                    <p>Ensure that your printer is properly connected to the system via a USB cable. Print a test page. If the printer fails to respond, check that the printer cable is firmly connected to your computer.</p>
                    <p>If issues persist, turn the printer off, wait for 30 seconds, and then turn it back on.</p>
                  </section>

                  <section id="corrupt-pdf">
                    <h2>Corrupt or problematic PDF file</h2>
                    <h3>Print as image</h3>
                    <ol>
                      <li>Open Acrobat.</li>
                      <li>Select <strong>Print this file</strong> from the top bar.</li>
                      <li>In the Print dialog box, select <strong>Advanced</strong>.</li>
                      <li>Select <strong>Print as Image</strong>.</li>
                    </ol>
                  </section>
                </>
              )}

              {selectedArticle.id === "photoshop-scratch-disk" && (
                <>
                  <section id="what-is-scratch-disk">
                    <h2>What is a scratch disk?</h2>
                    <p>A scratch disk is a drive or partition with free memory. Photoshop uses this space to store portions of your documents and their history states that don't fit in RAM.</p>
                  </section>

                  <section id="change-scratch-disk">
                    <h2>Change scratch disk preferences</h2>
                    <ol>
                      <li>Choose <strong>Edit {">"} Preferences {">"} Scratch Disks</strong> (Windows) or <strong>Photoshop {">"} Settings {">"} Scratch Disks</strong> (macOS).</li>
                      <li>Select or deselect the disk(s) you want to use. Use the arrow buttons to change the order.</li>
                      <li>Click OK and restart Photoshop.</li>
                    </ol>
                  </section>

                  <section id="free-space">
                    <h2>Free up space on scratch disk</h2>
                    <ul>
                      <li>Delete temporary files from your system</li>
                      <li>Empty the Recycle Bin or Trash</li>
                      <li>Choose <strong>Edit {">"} Purge {">"} All</strong> to clear Photoshop's memory</li>
                      <li>Close other applications to free up RAM</li>
                    </ul>
                  </section>
                </>
              )}

              {selectedArticle.id === "acrobat-convert-to-pdf" && (
                <>
                  <section id="convert-methods">
                    <h2>Convert files to PDF</h2>
                    <p>You can create PDFs from various file types using Acrobat. The most common methods include:</p>
                    <ul>
                      <li>Using the Create PDF tool in Acrobat</li>
                      <li>Converting from within the source application (Word, Excel, etc.)</li>
                      <li>Dragging and dropping files into Acrobat</li>
                      <li>Right-clicking files and choosing "Convert to Adobe PDF"</li>
                    </ul>
                  </section>

                  <section id="word-to-pdf">
                    <h2>Convert Word documents to PDF</h2>
                    <ol>
                      <li>Open Acrobat and choose <strong>Tools {">"} Create PDF</strong>.</li>
                      <li>Select <strong>Single File</strong>, then click <strong>Select a File</strong>.</li>
                      <li>Browse to your Word document and click <strong>Open</strong>.</li>
                      <li>Click <strong>Create</strong>. Acrobat converts the file to PDF.</li>
                    </ol>
                  </section>
                </>
              )}

              {selectedArticle.id === "acrobat-run-error" && (
                <>
                  <section id="causes">
                    <h2>Common causes of run errors</h2>
                    <p>Acrobat run errors typically occur due to:</p>
                    <ul>
                      <li>Corrupted application preferences</li>
                      <li>Conflicting third-party plugins or extensions</li>
                      <li>Damaged installation files</li>
                      <li>Insufficient system permissions</li>
                      <li>Outdated system components or drivers</li>
                    </ul>
                  </section>

                  <section id="repair">
                    <h2>Repair Acrobat installation</h2>
                    <h3>Windows</h3>
                    <ol>
                      <li>Close Acrobat if it's running.</li>
                      <li>Go to <strong>Control Panel {">"} Programs {">"} Programs and Features</strong>.</li>
                      <li>Select <strong>Adobe Acrobat</strong>, then click <strong>Change</strong>.</li>
                      <li>Click <strong>Repair</strong> and follow the prompts.</li>
                      <li>Restart your computer after the repair completes.</li>
                    </ol>

                    <h3>macOS</h3>
                    <ol>
                      <li>Open the <strong>Creative Cloud Desktop app</strong>.</li>
                      <li>Find Acrobat, click the three dots menu.</li>
                      <li>Select <strong>Uninstall</strong>, then reinstall from Creative Cloud.</li>
                      <li>Restart your Mac after installation.</li>
                    </ol>
                  </section>

                  <section id="safe-mode">
                    <h2>Start Acrobat in safe mode</h2>
                    <p>Hold the <strong>Shift</strong> key while launching Acrobat to start in safe mode, which disables all plugins and custom settings.</p>
                  </section>
                </>
              )}

              {selectedArticle.id === "photoshop-layers" && (
                <>
                  <section id="group-layers">
                    <h2>Group layers</h2>
                    <p>Grouping layers helps you organize your document and keeps the Layers panel manageable.</p>
                    <ol>
                      <li>Select multiple layers in the Layers panel (Ctrl/Cmd+click).</li>
                      <li>Choose <strong>Layer {">"} Group Layers</strong> or press <strong>Ctrl+G</strong> (Windows) or <strong>Cmd+G</strong> (macOS).</li>
                      <li>Name the group by double-clicking the group name.</li>
                    </ol>
                  </section>

                  <section id="ungroup-layers">
                    <h2>Ungroup layers</h2>
                    <p>When you ungroup layers, the layers move out of the group folder to the position above the group in the Layers panel.</p>
                    <ol>
                      <li>Select the group in the Layers panel.</li>
                      <li>Choose <strong>Layer {">"} Ungroup Layers</strong> or press <strong>Ctrl+Shift+G</strong> (Windows) or <strong>Cmd+Shift+G</strong> (macOS).</li>
                    </ol>
                  </section>

                  <section id="transform-groups">
                    <h2>Transform multiple layers together</h2>
                    <p>You can transform grouped layers or multiple selected layers while maintaining their relative positions.</p>
                    <ol>
                      <li>Select multiple layers or a group.</li>
                      <li>Press <strong>Ctrl+T</strong> (Windows) or <strong>Cmd+T</strong> (macOS) to enter Free Transform.</li>
                      <li>Hold <strong>Shift</strong> to maintain proportions while transforming.</li>
                      <li>Press <strong>Enter</strong> to apply the transformation.</li>
                    </ol>
                  </section>
                </>
              )}

              {selectedArticle.id === "acrobat-edit-text" && (
                <>
                  <section id="edit-text-tool">
                    <h2>Use the Edit Text tool</h2>
                    <ol>
                      <li>Open your PDF in Acrobat.</li>
                      <li>Choose <strong>Tools {">"} Edit PDF</strong>.</li>
                      <li>Click on the text you want to edit. A bounding box appears around the text.</li>
                      <li>Type your changes. Text will reflow automatically.</li>
                      <li>Click outside the text box or press <strong>Esc</strong> when done.</li>
                    </ol>
                  </section>

                  <section id="formatting">
                    <h2>Format text</h2>
                    <p>With the text selected, use the Format panel on the right to:</p>
                    <ul>
                      <li>Change font family, size, and color</li>
                      <li>Apply bold, italic, or underline</li>
                      <li>Adjust line spacing and alignment</li>
                      <li>Modify character and paragraph spacing</li>
                    </ul>
                  </section>

                  <section id="match-fonts">
                    <h2>Match fonts in edited text</h2>
                    <p>If the original font is not installed on your system, Acrobat will substitute a similar font. To match fonts:</p>
                    <ol>
                      <li>Select the text with the font you want to match.</li>
                      <li>Note the font name in the Format panel.</li>
                      <li>Install that font on your system if available.</li>
                      <li>Restart Acrobat to access the newly installed font.</li>
                    </ol>
                  </section>
                </>
              )}

              {selectedArticle.id === "acrobat-print-settings" && (
                <>
                  <section id="page-scaling">
                    <h2>Page scaling options</h2>
                    <p>Control how PDFs fit on the paper when printing.</p>
                    <ul>
                      <li><strong>Actual size:</strong> Prints at 100% scale</li>
                      <li><strong>Fit:</strong> Scales to fit the paper</li>
                      <li><strong>Shrink oversized pages:</strong> Only scales down pages larger than paper</li>
                      <li><strong>Custom scale:</strong> Enter a specific percentage</li>
                    </ul>
                  </section>

                  <section id="color-management">
                    <h2>Color management settings</h2>
                    <ol>
                      <li>In the Print dialog, click <strong>Advanced</strong>.</li>
                      <li>Under <strong>Color Management</strong>, choose:
                        <ul>
                          <li><strong>Document:</strong> Uses colors from the PDF</li>
                          <li><strong>Proof:</strong> Simulates output device colors</li>
                          <li><strong>Printer Managed:</strong> Lets printer handle color</li>
                        </ul>
                      </li>
                    </ol>
                  </section>

                  <section id="duplex-printing">
                    <h2>Set up duplex printing</h2>
                    <ol>
                      <li>Click <strong>Print</strong> from the File menu.</li>
                      <li>Click <strong>Properties</strong> or <strong>Printer Properties</strong>.</li>
                      <li>Look for a <strong>Layout</strong>, <strong>Finishing</strong>, or <strong>Features</strong> tab.</li>
                      <li>Select <strong>Print on Both Sides</strong> or <strong>Duplex</strong>.</li>
                      <li>Choose binding edge: <strong>Long Edge</strong> (vertical flip) or <strong>Short Edge</strong> (horizontal flip).</li>
                    </ol>
                  </section>
                </>
              )}

              {selectedArticle.id === "acrobat-enterprise-install" && (
                <>
                  <section id="deployment">
                    <h2>Deploy Acrobat Enterprise</h2>
                    <p>Use enterprise deployment tools to install Acrobat across multiple computers.</p>
                    
                    <h3>Using Creative Cloud Packager</h3>
                    <ol>
                      <li>Download and install Creative Cloud Packager from Adobe Admin Console.</li>
                      <li>Create a new package, select Acrobat, and configure licensing.</li>
                      <li>Set deployment options: self-service or managed deployment.</li>
                      <li>Build the package and deploy via your IT management tools.</li>
                    </ol>

                    <h3>Deployment via SCCM or Jamf</h3>
                    <p>Import the Acrobat package into your management tool and deploy to target computers. Ensure system requirements are met before deployment.</p>
                  </section>

                  <section id="licensing">
                    <h2>Activate enterprise license</h2>
                    <ol>
                      <li>Launch Acrobat after installation.</li>
                      <li>If prompted, choose <strong>Enterprise or team license</strong>.</li>
                      <li>Enter your serial number or sign in with Adobe ID.</li>
                      <li>The license activates automatically once validated.</li>
                    </ol>
                  </section>

                  <section id="requirements">
                    <h2>System requirements</h2>
                    <p><strong>Minimum:</strong></p>
                    <ul>
                      <li>2GB RAM (8GB recommended)</li>
                      <li>4.5GB of available hard-disk space</li>
                      <li>1024x768 screen resolution</li>
                      <li>Windows 10 (64-bit) or macOS 10.15 or later</li>
                    </ul>
                  </section>
                </>
              )}

              {selectedArticle.id === "photoshop-save-error" && (
                <>
                  <section id="common-causes">
                    <h2>Why save errors occur</h2>
                    <p>Program errors when saving can be caused by:</p>
                    <ul>
                      <li>Insufficient disk space on the save location</li>
                      <li>File or folder permission restrictions</li>
                      <li>Corrupt or problematic fonts in the document</li>
                      <li>Network issues when saving to a server</li>
                      <li>Special characters in the file name</li>
                      <li>Very large file sizes (over 2GB for PSD format)</li>
                    </ul>
                  </section>

                  <section id="quick-fixes">
                    <h2>Quick fixes when save fails</h2>
                    <ol>
                      <li><strong>Save to a different location:</strong> Try saving to your Desktop or Documents folder.</li>
                      <li><strong>Change the file name:</strong> Use only letters, numbers, and hyphens.</li>
                      <li><strong>Flatten the image:</strong> Choose <strong>Image {">"} Flatten Image</strong>, then save.</li>
                      <li><strong>Save as a different format:</strong> Try TIFF instead of PSD.</li>
                      <li><strong>Restart Photoshop:</strong> Close and reopen the application.</li>
                    </ol>
                  </section>

                  <section id="recovery">
                    <h2>Recover unsaved work</h2>
                    <p>If Photoshop crashes before you can save:</p>
                    <ol>
                      <li>Restart Photoshop. It may offer to recover your work.</li>
                      <li>Check <strong>File {">"} Open Recent</strong> for auto-saved versions.</li>
                      <li>Look in the temp folder: <code>C:\Users\[username]\AppData\Local\Temp</code> (Windows) or <code>~/Library/Application Support/Adobe/Adobe Photoshop [version]/AutoRecover</code> (macOS).</li>
                    </ol>
                  </section>
                </>
              )}

              {selectedArticle.id === "photoshop-selections" && (
                <>
                  <section id="move-selection">
                    <h2>Move a selection marquee</h2>
                    <p>To move just the selection outline (not the pixels):</p>
                    <ol>
                      <li>Select any selection tool (Rectangular Marquee, Lasso, etc.).</li>
                      <li>Position your cursor inside the selection.</li>
                      <li>Drag to move the selection outline.</li>
                      <li>Use arrow keys to nudge 1 pixel at a time, or Shift+arrow keys to move 10 pixels.</li>
                    </ol>
                  </section>

                  <section id="move-content">
                    <h2>Move selected content</h2>
                    <p>To move the actual pixels inside a selection:</p>
                    <ol>
                      <li>Make your selection.</li>
                      <li>Switch to the <strong>Move tool</strong> (V).</li>
                      <li>Click and drag inside the selection to move the content.</li>
                      <li>Hold <strong>Shift</strong> to constrain movement to horizontal, vertical, or 45° angles.</li>
                    </ol>
                  </section>

                  <section id="transform-selection">
                    <h2>Transform a selection</h2>
                    <ol>
                      <li>Make a selection, then press <strong>Ctrl+T</strong> (Windows) or <strong>Cmd+T</strong> (macOS).</li>
                      <li>Drag corner handles to resize. Hold <strong>Shift</strong> to maintain proportions.</li>
                      <li>Drag outside the bounding box to rotate.</li>
                      <li>Press <strong>Enter</strong> to apply, or <strong>Esc</strong> to cancel.</li>
                    </ol>
                  </section>
                </>
              )}

              {selectedArticle.id === "photoshop-system-requirements" && (
                <>
                  <section id="minimum-requirements">
                    <h2>Minimum system requirements</h2>
                    
                    <h3>Windows</h3>
                    <ul>
                      <li>Windows 10 (64-bit) version 1809 or later</li>
                      <li>8GB of RAM (16GB recommended)</li>
                      <li>4GB of GPU memory</li>
                      <li>10GB of available hard-disk space</li>
                      <li>1920x1080 display resolution</li>
                    </ul>

                    <h3>macOS</h3>
                    <ul>
                      <li>macOS 11 (Big Sur) or later</li>
                      <li>8GB of RAM (16GB recommended)</li>
                      <li>4GB of GPU memory</li>
                      <li>10GB of available hard-disk space</li>
                      <li>1920x1080 display resolution</li>
                    </ul>
                  </section>

                  <section id="gpu-requirements">
                    <h2>GPU requirements</h2>
                    <p>A compatible GPU accelerates Photoshop performance for features like:</p>
                    <ul>
                      <li>Neural Filters</li>
                      <li>Camera Raw</li>
                      <li>Perspective Warp</li>
                      <li>3D features</li>
                      <li>Oil Paint filter</li>
                    </ul>
                    <p>Check <strong>Edit {">"} Preferences {">"} Performance</strong> to verify your GPU is detected.</p>
                  </section>

                  <section id="recommended-specs">
                    <h2>Recommended specifications</h2>
                    <p>For professional work and large files:</p>
                    <ul>
                      <li>32GB+ RAM for files over 500MB</li>
                      <li>GPU with 8GB+ VRAM</li>
                      <li>SSD storage with 50GB+ free space</li>
                      <li>Fast multi-core processor (8+ cores)</li>
                      <li>4K display for high-resolution work</li>
                    </ul>
                  </section>
                </>
              )}

              {selectedArticle.id === "acrobat-edit-text" && (
                <>
                  <section id="editing">
                    <h2>Change text in a PDF</h2>
                    <ol>
                      <li>Open your PDF in Acrobat.</li>
                      <li>Choose <strong>Tools {">"} Edit PDF</strong>.</li>
                      <li>Click on the text you want to edit. A bounding box appears.</li>
                      <li>Type your changes. Text will reflow automatically within the box.</li>
                      <li>Click outside the text box when finished.</li>
                    </ol>
                  </section>

                  <section id="formatting">
                    <h2>Format text</h2>
                    <p>Use the Format panel on the right to modify:</p>
                    <ul>
                      <li><strong>Font:</strong> Change typeface, size, and style</li>
                      <li><strong>Alignment:</strong> Left, center, right, or justified</li>
                      <li><strong>Color:</strong> Click the color swatch to choose a new color</li>
                      <li><strong>Spacing:</strong> Adjust line height and character spacing</li>
                    </ul>
                  </section>

                  <section id="scanned-pdfs">
                    <h2>Edit text in scanned PDFs</h2>
                    <p>For scanned PDFs, you must first recognize the text:</p>
                    <ol>
                      <li>Choose <strong>Tools {">"} Scan & OCR {">"} Recognize Text</strong>.</li>
                      <li>Select <strong>In This File</strong>.</li>
                      <li>Click <strong>Recognize Text</strong>.</li>
                      <li>After processing, use the Edit PDF tool to edit the recognized text.</li>
                    </ol>
                  </section>
                </>
              )}

              {selectedArticle.id === "acrobat-print-settings" && (
                <>
                  <section id="page-scaling">
                    <h2>Page scaling options</h2>
                    <p>Control how PDFs fit on paper:</p>
                    <ul>
                      <li><strong>Actual size:</strong> Prints at 100% with no scaling</li>
                      <li><strong>Fit:</strong> Scales page to fit paper size</li>
                      <li><strong>Shrink oversized pages:</strong> Only scales pages larger than paper</li>
                      <li><strong>Custom scale:</strong> Enter a percentage (e.g., 95%)</li>
                    </ul>
                  </section>

                  <section id="print-quality">
                    <h2>Optimize print quality</h2>
                    <ol>
                      <li>In the Print dialog, select your printer.</li>
                      <li>Click <strong>Advanced</strong>.</li>
                      <li>For best quality:
                        <ul>
                          <li>Select <strong>Output: Color</strong></li>
                          <li>Set quality to <strong>High</strong> or <strong>Best</strong></li>
                          <li>Enable <strong>Print as Image</strong> for complex PDFs</li>
                        </ul>
                      </li>
                      <li>Click <strong>OK</strong>, then <strong>Print</strong>.</li>
                    </ol>
                  </section>

                  <section id="multiple-pages">
                    <h2>Print multiple pages per sheet</h2>
                    <ol>
                      <li>In the Print dialog, find <strong>Page Sizing & Handling</strong>.</li>
                      <li>Select <strong>Multiple</strong>.</li>
                      <li>Choose how many pages per sheet (2, 4, 6, 9, or 16).</li>
                      <li>Set the page order and whether to print borders.</li>
                    </ol>
                  </section>
                </>
              )}

              {selectedArticle.id === "acrobat-enterprise-install" && (
                <>
                  <section id="deployment">
                    <h2>Deploy Acrobat Enterprise</h2>
                    <p>Use enterprise deployment tools for installation across your organization.</p>
                    
                    <h3>Creative Cloud Packager</h3>
                    <ol>
                      <li>Download Creative Cloud Packager from Adobe Admin Console.</li>
                      <li>Create a package selecting Acrobat and license type.</li>
                      <li>Configure update settings and preferences.</li>
                      <li>Build the package for deployment.</li>
                    </ol>

                    <h3>Management Tools</h3>
                    <p>Deploy packages using:</p>
                    <ul>
                      <li>Microsoft SCCM (System Center Configuration Manager)</li>
                      <li>Jamf Pro for macOS</li>
                      <li>Group Policy on Windows networks</li>
                      <li>Third-party deployment software</li>
                    </ul>
                  </section>

                  <section id="licensing">
                    <h2>License activation</h2>
                    <p>Acrobat Enterprise supports two license types:</p>
                    <ul>
                      <li><strong>Named User Licensing:</strong> Users sign in with Adobe ID</li>
                      <li><strong>Serial Number:</strong> Enter during or after installation</li>
                    </ul>
                  </section>

                  <section id="troubleshooting">
                    <h2>Troubleshoot installation issues</h2>
                    <ul>
                      <li>Check system requirements are met</li>
                      <li>Disable antivirus temporarily during install</li>
                      <li>Ensure admin rights for installation</li>
                      <li>Remove previous versions completely before installing</li>
                      <li>Check installation logs in Creative Cloud folder</li>
                    </ul>
                  </section>
                </>
              )}

              {/* Generic content for remaining articles */}
              {!["acrobat-printing-errors", "photoshop-scratch-disk", "acrobat-convert-to-pdf", "photoshop-layers", "acrobat-run-error", "acrobat-edit-text", "acrobat-print-settings", "acrobat-enterprise-install", "photoshop-save-error", "photoshop-selections", "photoshop-system-requirements"].includes(selectedArticle.id) && (
                <>
                  <section>
                    <h2>Overview</h2>
                    <p>{selectedArticle.summaryText.replace("Learn about:", "").trim()}</p>
                  </section>

                  <section>
                    <h2>Getting started</h2>
                    <p>This help article provides comprehensive guidance on {selectedArticle.title.toLowerCase()}.</p>
                    <p>Use the AI Summary above to quickly find answers to common questions and navigate directly to relevant sections of this article.</p>
                  </section>
                </>
              )}
              
              {/* More space for scrolling */}
              <div className={style({ height: "[800px]" })} />
            </div>
            </div>
          </main>
        </div>
      </div>
    </Provider>
  );
};

export default MultiArticleDemo;

