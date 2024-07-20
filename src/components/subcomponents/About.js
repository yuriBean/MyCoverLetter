import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vector1 from '../../assets/Vector1.png';
import undraw_Hiring from '../../assets/undraw_Hiring.png';

const About = () => {
  return (
    <Container fluid className="card-section" style={{ padding: '150px 0px', background: `url(${Vector1})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
    <div id='about' style={{ position: 'absolute', top: '170px', left: 0, width: '100%', height: '100%', zIndex: 1 }}>
    <svg width="1344" height="602" viewBox="0 0 1344 602" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M35.7082 107.416C55.4293 107.416 71.4164 91.4293 71.4164 71.7082C71.4164 51.9871 55.4293 36 35.7082 36C15.9871 36 0 51.9871 0 71.7082C0 91.4293 15.9871 107.416 35.7082 107.416ZM35.7082 95.5137C48.8556 95.5137 59.5136 84.8556 59.5136 71.7082C59.5136 58.5608 48.8556 47.9027 35.7082 47.9027C22.5608 47.9027 11.9027 58.5608 11.9027 71.7082C11.9027 84.8556 22.5608 95.5137 35.7082 95.5137Z" fill="#1A5319"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M123.708 509.416C143.429 509.416 159.416 493.429 159.416 473.708C159.416 453.987 143.429 438 123.708 438C103.987 438 88 453.987 88 473.708C88 493.429 103.987 509.416 123.708 509.416ZM123.708 497.514C136.856 497.514 147.514 486.856 147.514 473.708C147.514 460.561 136.856 449.903 123.708 449.903C110.561 449.903 99.9027 460.561 99.9027 473.708C99.9027 486.856 110.561 497.514 123.708 497.514Z" fill="#508D4E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M90.5 39C101.27 39 110 30.2696 110 19.5C110 8.73045 101.27 0 90.5 0C79.7304 0 71 8.73045 71 19.5C71 30.2696 79.7304 39 90.5 39ZM90.4999 32.5C97.6796 32.5 103.5 26.6797 103.5 19.5C103.5 12.3203 97.6796 6.49998 90.4999 6.49998C83.3202 6.49998 77.4999 12.3203 77.4999 19.5C77.4999 26.6797 83.3202 32.5 90.4999 32.5Z" fill="#508D4E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1233.71 74.4164C1253.43 74.4164 1269.42 58.4293 1269.42 38.7082C1269.42 18.9871 1253.43 3 1233.71 3C1213.99 3 1198 18.9871 1198 38.7082C1198 58.4293 1213.99 74.4164 1233.71 74.4164ZM1233.71 62.5137C1246.86 62.5137 1257.51 51.8556 1257.51 38.7082C1257.51 25.5608 1246.86 14.9027 1233.71 14.9027C1220.56 14.9027 1209.9 25.5608 1209.9 38.7082C1209.9 51.8556 1220.56 62.5137 1233.71 62.5137Z" fill="#508D4E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1304.71 355.416C1324.43 355.416 1340.42 339.429 1340.42 319.708C1340.42 299.987 1324.43 284 1304.71 284C1284.99 284 1269 299.987 1269 319.708C1269 339.429 1284.99 355.416 1304.71 355.416ZM1304.71 343.514C1317.86 343.514 1328.51 332.856 1328.51 319.708C1328.51 306.561 1317.86 295.903 1304.71 295.903C1291.56 295.903 1280.9 306.561 1280.9 319.708C1280.9 332.856 1291.56 343.514 1304.71 343.514Z" fill="#508D4E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1324.5 241C1335.27 241 1344 232.27 1344 221.5C1344 210.73 1335.27 202 1324.5 202C1313.73 202 1305 210.73 1305 221.5C1305 232.27 1313.73 241 1324.5 241ZM1324.5 234.5C1331.68 234.5 1337.5 228.68 1337.5 221.5C1337.5 214.32 1331.68 208.5 1324.5 208.5C1317.32 208.5 1311.5 214.32 1311.5 221.5C1311.5 228.68 1317.32 234.5 1324.5 234.5Z" fill="#1A5319"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1208.5 602C1219.27 602 1228 593.27 1228 582.5C1228 571.73 1219.27 563 1208.5 563C1197.73 563 1189 571.73 1189 582.5C1189 593.27 1197.73 602 1208.5 602ZM1208.5 595.5C1215.68 595.5 1221.5 589.68 1221.5 582.5C1221.5 575.32 1215.68 569.5 1208.5 569.5C1201.32 569.5 1195.5 575.32 1195.5 582.5C1195.5 589.68 1201.32 595.5 1208.5 595.5Z" fill="#1A5319"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M90.5 405C101.27 405 110 396.27 110 385.5C110 374.73 101.27 366 90.5 366C79.7304 366 71 374.73 71 385.5C71 396.27 79.7304 405 90.5 405ZM90.4999 398.5C97.6796 398.5 103.5 392.68 103.5 385.5C103.5 378.32 97.6796 372.5 90.4999 372.5C83.3202 372.5 77.4999 378.32 77.4999 385.5C77.4999 392.68 83.3202 398.5 90.4999 398.5Z" fill="#1A5319"/>
<circle  cx="51.5" cy="269.5" r="13" fill="#508D4E"/>
</svg>
    </div>


    <Card  style={{ background: 'white', color: 'black', margin: '150px 200px', zIndex: '2', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>

      <Row noGutters>
        <Col md={6} >
          <Card.Img src={undraw_Hiring} alt="Card image" />
        </Col>
        <Col md={6} style={{ alignContent: 'center', textAlign: 'left'}}>
          <Card.Body >
            <Card.Title style={{ color: '#1A5319', fontWeight: '700', fontSize: '45px'}}>About MyCoverLetter</Card.Title>
            <Card.Text style={{ color: '#00000073', fontWeight: '700', fontSize: '20px'}}>
            Writing a cover letter in German is a difficult and time consuming. Latest improvements in AI made it possible for everyone to write a text without any faults. However, it is easily detectable by a recruiter. The used language is too complex, the used wording seems to be suspicious. With the solution of MyCoverLetter you are enabled to write an authentic and individual cover letter in a comparable small amount of time. Our product makes it possible to write a high number of high-quality applications. Maximize your chances to get your next dream job.
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  </Container>
)
}

export default About
