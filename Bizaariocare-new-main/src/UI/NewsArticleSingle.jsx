import { NavLink } from "react-router"


const NewsArticleSingle = ({
    id,
    img, title, desc,
    article
}) => {
    console.log(id)
  return (
      <>
     
          <div className="col-lg-4 col-md-6 col-12 mb-4" key={id}> 
              <div className="card border-0 shadow-sm h-100 rounded-4 p-3">
                <img src={img} className="card-img-top " alt={title} />
                <div className="pt-3">
                  <h4 className="fw-bold">{title}</h4>
                  <p className=" small mb-1 light-color">{desc}
                          <NavLink
                              className="country-card ms-4 fw-semi-bold read-more-btn  text-decoration-none"
                              to={`${id}`} article={article}
                          > 
                         Read More     
                      </NavLink>
                  </p>
                </div>
              </div>
            
              </div>
       
    </>
  )
}

export default NewsArticleSingle
