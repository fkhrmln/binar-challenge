import FAQAccordion from './FAQAccordion';

const faqList = [
  {
    id: 1,
    title: 'Apa saja syarat yang dibutuhkan?',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur dolore veniam sed nemo consequuntur iste et dignissimos vero eius perferendis fuga, sapiente aperiam repudiandae quas architecto suscipit. Sapiente tempore ab magnam sequi optio amet, quod libero laboriosam modi. Asperiores eligendi voluptatibus aperiam in quia repudiandae. At fugit qui ut totam.',
  },
  {
    id: 2,
    title: 'Berapa hari minimal sewa mobil lepas kunci?',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur dolore veniam sed nemo consequuntur iste et dignissimos vero eius perferendis fuga, sapiente aperiam repudiandae quas architecto suscipit. Sapiente tempore ab magnam sequi optio amet, quod libero laboriosam modi. Asperiores eligendi voluptatibus aperiam in quia repudiandae. At fugit qui ut totam.',
  },
  {
    id: 3,
    title: 'Berapa hari sebelumnya sabaiknya booking sewa mobil?',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur dolore veniam sed nemo consequuntur iste et dignissimos vero eius perferendis fuga, sapiente aperiam repudiandae quas architecto suscipit. Sapiente tempore ab magnam sequi optio amet, quod libero laboriosam modi. Asperiores eligendi voluptatibus aperiam in quia repudiandae. At fugit qui ut totam.',
  },
  {
    id: 4,
    title: 'Apakah Ada biaya antar-jemput?',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur dolore veniam sed nemo consequuntur iste et dignissimos vero eius perferendis fuga, sapiente aperiam repudiandae quas architecto suscipit. Sapiente tempore ab magnam sequi optio amet, quod libero laboriosam modi. Asperiores eligendi voluptatibus aperiam in quia repudiandae. At fugit qui ut totam.',
  },
  {
    id: 5,
    title: 'Bagaimana jika terjadi kecelakaan',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur dolore veniam sed nemo consequuntur iste et dignissimos vero eius perferendis fuga, sapiente aperiam repudiandae quas architecto suscipit. Sapiente tempore ab magnam sequi optio amet, quod libero laboriosam modi. Asperiores eligendi voluptatibus aperiam in quia repudiandae. At fugit qui ut totam.',
  },
];

export default () => {
  return (
    <div id="faq" className="container pt-5 py-md-5">
      <div className="row justify-content-between">
        <div className="text-center text-md-start col-md-5 d-flex flex-column row-gap-3 row-gap-md-4">
          <h1 className="faq__heading">Frequently Asked Question</h1>
          <p className="faq__paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
        </div>
        <div className="d-flex flex-column row-gap-3 col-md-7 mt-4 mt-md-0">
          {faqList.map(({ id, title, description }) => (
            <FAQAccordion key={id} id={id} title={title} description={description} />
          ))}
        </div>
      </div>
    </div>
  );
};
