export interface ArticleQuestion {
  id: string;
  text: string;
  answer: string;
  steps?: Array<{ text: string }>;
}

export interface Article {
  id: string;
  title: string;
  url: string;
  product: "Acrobat" | "Photoshop";
  category: string;
  summaryText: string;
  summaryLinks: Array<{ text: string; href: string }>;
  questions: ArticleQuestion[];
}

export const articles: Article[] = [
  {
    id: "acrobat-printing-errors",
    title: "Error while printing PDFs in Acrobat",
    url: "helpx.adobe.com/acrobat/desktop/troubleshoot/print-scan-issues/printing-errors.html",
    product: "Acrobat",
    category: "Print and scan issues",
    summaryText: "Fix common Acrobat printing errors quickly so you can print documents without unexpected failures. Learn about:",
    summaryLinks: [
      { text: "Printer settings, drivers, and Acrobat preferences commonly cause errors", href: "#acrobat-not-updated" },
      { text: "Check the print queue and printer connection", href: "#printer-connection" },
      { text: "Step by step fixes to get a successful print job", href: "#corrupt-pdf" }
    ],
    questions: [
      {
        id: "q1",
        text: "Why does Acrobat fail to print a document?",
        answer: "Acrobat can fail to print due to issues with the PDF file itself (like corruption), problems with the printer (like outdated drivers or connection issues), or software-related conflicts (like corrupted Acrobat preferences or security settings)."
      },
      {
        id: "q2",
        text: "How do I clear a stuck print job on my computer?",
        answer: "To clear a stuck print job:",
        steps: [
          { text: "Open your printer queue (Windows: Settings > Devices > Printers, Mac: System Preferences > Printers)" },
          { text: "Right-click the stuck job and select 'Cancel'" },
          { text: "If it won't cancel, restart the Print Spooler service (Windows) or reset the printing system (Mac)" },
          { text: "Turn your printer off and on again to clear its memory" }
        ]
      },
      {
        id: "q3",
        text: "Which printer driver should I use with Acrobat?",
        answer: "Always use the latest printer driver from your printer manufacturer's website. Visit the support section, search for your exact printer model, and download the most recent driver."
      }
    ]
  },
  {
    id: "acrobat-run-error",
    title: "Acrobat run errors",
    url: "helpx.adobe.com/acrobat/desktop/troubleshoot/performance-issues/acrobat-run-error.html",
    product: "Acrobat",
    category: "Performance issues",
    summaryText: "Resolve Acrobat run errors so the app opens and performs reliably. Learn about:",
    summaryLinks: [
      { text: "Corrupted files, conflicting plugins, and permission issues", href: "#causes" },
      { text: "How to repair or reset Acrobat", href: "#repair" },
      { text: "Steps to open PDFs and work without crashes", href: "#safe-mode" }
    ],
    questions: [
      {
        id: "q1",
        text: "What causes Acrobat run errors on startup?",
        answer: "Acrobat run errors can be caused by corrupted preferences, conflicting plugins, outdated system files, insufficient permissions, or damaged installation files."
      },
      {
        id: "q2",
        text: "How do I repair Acrobat on Windows or macOS?",
        answer: "To repair Acrobat:",
        steps: [
          { text: "Close Acrobat completely" },
          { text: "Windows: Go to Control Panel > Programs > Uninstall, select Acrobat, click Change, then Repair" },
          { text: "macOS: Reinstall Acrobat from Creative Cloud app" },
          { text: "Restart your computer after repair completes" }
        ]
      },
      {
        id: "q3",
        text: "How can I start Acrobat in safe mode or without plugins?",
        answer: "Hold Shift while launching Acrobat to start in safe mode, which disables plugins and custom settings. This helps identify if a plugin is causing the error."
      }
    ]
  },
  {
    id: "acrobat-convert-to-pdf",
    title: "Convert files to PDF",
    url: "helpx.adobe.com/acrobat/desktop/create-documents/create-pdfs/convert-to-pdf.html",
    product: "Acrobat",
    category: "Create documents",
    summaryText: "Convert files to high quality PDFs from any app so you can share, print, and archive documents reliably. Learn about:",
    summaryLinks: [
      { text: "Converting Word, Excel, images, and web pages to PDFs", href: "#convert-methods" },
      { text: "How to convert Word documents to PDF", href: "#word-to-pdf" },
      { text: "Methods for creating high-quality PDFs", href: "#convert-methods" }
    ],
    questions: [
      {
        id: "q1",
        text: "How do I convert a Word document to PDF?",
        answer: "Open Acrobat, choose Create PDF from File, select your Word document, and click Create. Or in Microsoft Word, choose File > Save As and select PDF as the format."
      },
      {
        id: "q2",
        text: "How can I make a searchable PDF from scans?",
        answer: "After scanning, use Acrobat's OCR (Optical Character Recognition) tool: Select Tools > Scan & OCR > Recognize Text, then choose the file and click Recognize Text."
      },
      {
        id: "q3",
        text: "How do I convert multiple files into a single PDF?",
        answer: "In Acrobat, choose Tools > Combine Files, add all your files, arrange them in order, then click Combine to merge them into one PDF."
      }
    ]
  },
  {
    id: "acrobat-edit-text",
    title: "Edit text in PDFs",
    url: "helpx.adobe.com/acrobat/desktop/edit-documents/edit-text-in-pdfs/modify-text.html",
    product: "Acrobat",
    category: "Edit documents",
    summaryText: "Edit text in a PDF to correct typos, update wording, or refine formatting without recreating the file. Learn about:",
    summaryLinks: [
      { text: "How to select and change text", href: "#edit-text-tool" },
      { text: "Matching fonts and spacing", href: "#formatting" },
      { text: "Handling text that is part of an image", href: "#scanned-pdfs" }
    ],
    questions: [
      {
        id: "q1",
        text: "How do I change text in a PDF using Acrobat?",
        answer: "Open the PDF in Acrobat, select Tools > Edit PDF, click on the text you want to change, then type your edits. The text will reflow automatically within its text box."
      },
      {
        id: "q2",
        text: "Why does edited text reflow or shift formatting?",
        answer: "Text reflows when the PDF's layout structure changes. This happens with font substitutions, size changes, or when text doesn't fit the original box. Use Format options to control alignment and spacing."
      },
      {
        id: "q3",
        text: "Can I edit text in scanned PDFs and how?",
        answer: "Yes, first run OCR (Optical Character Recognition) on the scanned PDF. Choose Tools > Scan & OCR > Recognize Text. Once processed, the text becomes editable."
      }
    ]
  },
  {
    id: "acrobat-print-settings",
    title: "Print settings for PDFs",
    url: "helpx.adobe.com/acrobat/desktop/print-documents/set-up-and-print-pdfs/print-settings.html",
    product: "Acrobat",
    category: "Print documents",
    summaryText: "Set up print options to produce accurate paper copies from PDFs. Learn about:",
    summaryLinks: [
      { text: "Print settings for page scaling and color management", href: "#page-scaling" },
      { text: "Paper size and duplex printing options", href: "#duplex-printing" },
      { text: "Ensuring printed output matches expectations", href: "#print-quality" }
    ],
    questions: [
      {
        id: "q1",
        text: "How do I print a PDF at actual size without scaling?",
        answer: "In the Print dialog, under Page Sizing & Handling, select 'Actual size' or set the scale to 100%. Disable 'Fit' and 'Shrink oversized pages' options."
      },
      {
        id: "q2",
        text: "Which print settings preserve color and image quality?",
        answer: "Use high-quality print settings: select 'Color' output, set quality to 'Best' or 'High', and enable 'Print as Image' for complex documents with transparency."
      },
      {
        id: "q3",
        text: "How do I enable duplex or double sided printing?",
        answer: "In the Print dialog, click 'Properties' or 'Preferences', find the Layout or Finishing tab, and select 'Print on Both Sides' or 'Duplex'. Choose the binding edge option."
      }
    ]
  },
  {
    id: "acrobat-enterprise-install",
    title: "Install Acrobat Enterprise",
    url: "helpx.adobe.com/acrobat/desktop/get-started/access-the-app/install-acrobat-enterprise.html",
    product: "Acrobat",
    category: "Get started",
    summaryText: "Install Acrobat Enterprise on your desktop with the correct configuration so users get secure, managed access. Learn about:",
    summaryLinks: [
      { text: "Enterprise deployment and licensing activation", href: "#deployment" },
      { text: "Recommended system settings", href: "#requirements" },
      { text: "Minimizing installation issues", href: "#troubleshooting" }
    ],
    questions: [
      {
        id: "q1",
        text: "How do I install Acrobat Enterprise for multiple users?",
        answer: "Use the Creative Cloud Packager to create deployment packages with licensing and configuration presets. Deploy via IT management tools like SCCM, Jamf, or direct installation."
      },
      {
        id: "q2",
        text: "How do I activate an enterprise license or serial number?",
        answer: "During installation, enter your enterprise serial number when prompted. For already-installed copies, go to Help > Sign In, then enter enterprise credentials or serial number."
      },
      {
        id: "q3",
        text: "What are recommended system requirements for Acrobat Enterprise?",
        answer: "Minimum: 2GB RAM, 4.5GB disk space, 1024x768 display. Recommended: 8GB RAM, SSD storage, 1920x1080 display, and a supported OS (Windows 10/11 or macOS 10.15+)."
      }
    ]
  },
  {
    id: "photoshop-scratch-disk",
    title: "Troubleshoot scratch disk full errors",
    url: "helpx.adobe.com/photoshop/desktop/troubleshoot/performance-stability-issues/troubleshoot-scratch-disk-full-errors-in-photoshop.html",
    product: "Photoshop",
    category: "Performance and stability",
    summaryText: "Clear Photoshop scratch disk full errors so you can continue editing without performance interruptions. Learn about:",
    summaryLinks: [
      { text: "How Photoshop uses disk space", href: "#what-is-scratch-disk" },
      { text: "How to free or change scratch disks", href: "#change-scratch-disk" },
      { text: "Preventing future storage conflicts", href: "#free-space" }
    ],
    questions: [
      {
        id: "q1",
        text: "What is a Photoshop scratch disk and why does it fill up?",
        answer: "A scratch disk is where Photoshop stores temporary files when RAM is full. It fills up when working with large files, many layers, or running low on available disk space."
      },
      {
        id: "q2",
        text: "How do I free space or change the scratch disk location?",
        answer: "To change: Go to Edit > Preferences > Scratch Disks, select a drive with more space. To free space: Delete temp files, clear Photoshop cache (Edit > Purge > All), and empty your system trash."
      },
      {
        id: "q3",
        text: "How much disk space should I allocate for Photoshop?",
        answer: "Reserve at least 50GB of free space on your scratch disk. For professional work with large files, keep 100GB+ free. Photoshop needs 3-5x the file size as working space."
      }
    ]
  },
  {
    id: "photoshop-layers",
    title: "Group and ungroup layers",
    url: "helpx.adobe.com/photoshop/desktop/create-manage-layers/transform-manipulate-layers/group-and-ungroup-layers.html",
    product: "Photoshop",
    category: "Create and manage layers",
    summaryText: "Organize and edit layers to control complex Photoshop compositions more easily. Learn about:",
    summaryLinks: [
      { text: "How to group and ungroup layers", href: "#group-layers" },
      { text: "Applying transforms to multiple layers", href: "#transform-groups" },
      { text: "Ungrouping layers when needed", href: "#ungroup-layers" }
    ],
    questions: [
      {
        id: "q1",
        text: "How do I group and ungroup layers in Photoshop?",
        answer: "Select multiple layers in the Layers panel, then press Ctrl+G (Windows) or Cmd+G (Mac) to group. To ungroup, select the group and press Ctrl+Shift+G or Cmd+Shift+G."
      },
      {
        id: "q2",
        text: "How do I transform multiple layers together while keeping alignment?",
        answer: "Select all layers you want to transform (Ctrl/Cmd+click), then use Edit > Free Transform or press Ctrl+T (Windows) or Cmd+T (Mac). All selected layers will transform together."
      },
      {
        id: "q3",
        text: "How do I convert groups into smart objects and why do it?",
        answer: "Right-click the group and select 'Convert to Smart Object'. This lets you apply non-destructive transforms, filters, and keeps all layers editable inside the smart object."
      }
    ]
  },
  {
    id: "photoshop-save-error",
    title: "Resolve program error while saving files",
    url: "helpx.adobe.com/photoshop/desktop/troubleshoot/file-format-issues/resolve-program-error-while-saving-files.html",
    product: "Photoshop",
    category: "File format issues",
    summaryText: "Fix program errors that appear when saving Photoshop files so you do not lose work. Learn about:",
    summaryLinks: [
      { text: "Causes like permission issues and corrupt fonts", href: "#common-causes" },
      { text: "Step by step fixes to save work safely", href: "#quick-fixes" },
      { text: "How to recover damaged files", href: "#recovery" }
    ],
    questions: [
      {
        id: "q1",
        text: "Why does Photoshop show a program error when saving?",
        answer: "Common causes include insufficient disk space, file permission issues, corrupt fonts, problematic layers, unsupported characters in filename, or saving to a network drive."
      },
      {
        id: "q2",
        text: "How do I save a file when Save fails repeatedly?",
        answer: "Try: Save to a different location, Save As with a new name, flatten layers before saving, save as TIFF instead of PSD, or restart Photoshop and try again."
      },
      {
        id: "q3",
        text: "Which file formats are safest for large Photoshop projects?",
        answer: "PSD and PSB (for files over 2GB) are safest as they preserve all layers and features. TIFF is reliable for flattened files. Always keep a backup copy."
      }
    ]
  },
  {
    id: "photoshop-selections",
    title: "Control the movement of a selection",
    url: "helpx.adobe.com/photoshop/desktop/make-selections/refine-modify-selections/control-the-movement-of-a-selection.html",
    product: "Photoshop",
    category: "Make selections",
    summaryText: "Control selection movement so edits precisely affect the right pixels. Learn about:",
    summaryLinks: [
      { text: "How to nudge, transform, and constrain selections", href: "#move-selection" },
      { text: "Moving selected content without losing quality", href: "#move-content" },
      { text: "Using selection tools for clean, reversible edits", href: "#transform-selection" }
    ],
    questions: [
      {
        id: "q1",
        text: "How do I move a selection without deselecting it?",
        answer: "With any selection tool active, click inside the selection and drag to move it. Or use arrow keys to nudge 1 pixel at a time. Hold Shift+arrow to move 10 pixels."
      },
      {
        id: "q2",
        text: "How do I nudge a selection by single pixels for precision?",
        answer: "With the selection active, use arrow keys to move 1 pixel at a time. Hold Shift while pressing arrows to move 10 pixels. This works for the selection marquee or selected content."
      },
      {
        id: "q3",
        text: "How do I transform a selection while maintaining proportions?",
        answer: "Press Ctrl+T (Windows) or Cmd+T (Mac) to enter Free Transform, then hold Shift while dragging corner handles to maintain proportions. Press Enter to apply."
      }
    ]
  },
  {
    id: "photoshop-system-requirements",
    title: "Adobe Photoshop system requirements",
    url: "helpx.adobe.com/photoshop/desktop/get-started/technical-requirements-installation/adobe-photoshop-on-desktop-technical-requirements.html",
    product: "Photoshop",
    category: "Technical requirements",
    summaryText: "Check system requirements to ensure Adobe Photoshop runs smoothly on your desktop. Learn about:",
    summaryLinks: [
      { text: "Supported operating systems and hardware", href: "#minimum-requirements" },
      { text: "Memory and GPU recommendations", href: "#gpu-requirements" },
      { text: "Avoiding performance problems during installation", href: "#recommended-specs" }
    ],
    questions: [
      {
        id: "q1",
        text: "What are the minimum and recommended system requirements for Photoshop?",
        answer: "Minimum: 8GB RAM, 4GB GPU, 10GB storage. Recommended: 16GB+ RAM, 4GB+ GPU with DirectX 12/Metal support, SSD storage, and 20GB+ free space for optimal performance."
      },
      {
        id: "q2",
        text: "Does my GPU support Photoshop features like neural filters?",
        answer: "Neural filters require a GPU with 2GB+ VRAM and DirectX 12 (Windows) or Metal (Mac) support. Check Edit > Preferences > Performance to see if your GPU is detected and enabled."
      },
      {
        id: "q3",
        text: "How much RAM and disk space do I need for large files?",
        answer: "For files over 1GB, use 32GB+ RAM and keep 50GB+ free disk space for scratch files. Photoshop uses 3-5x the file size as working memory and scratch space."
      }
    ]
  }
];

