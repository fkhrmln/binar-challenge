interface Props {
  id: number;
  title: string;
  description: string;
}

export default ({ id, title, description }: Props) => {
  return (
    <div className="accordion" id={`custom-accordion-${id}`}>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${id}`}
            aria-expanded="true"
            aria-controls={`collapse-${id}`}
          >
            {title}
          </button>
        </h2>
        <div id={`collapse-${id}`} className="accordion-collapse collapse" data-bs-parent={`#custom-accordion-${id}`}>
          <div className="accordion-body">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
