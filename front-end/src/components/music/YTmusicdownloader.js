import React, { useState } from 'react'
import axios from 'axios'
import { Row, Col, Form, Button } from 'react-bootstrap'
import * as videoId from 'get-youtube-id'

const YTmusicdownloader = () => {
    const [link, setLink] = useState('')
    const [downloadOptions, setDownloadOptions] = useState([])
    const [showDownload, setShowDownload] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [url, setUrl] = useState({})
    const [title,setTitle] = useState('')
    const downloadUrl = "https://one.123berlin.xyz/dl.php?url=J01SJXPeIzh9ig1GL6caQ76csRLQp8wOEKBLXHsTi9oIttdpu6PeFimETAk4A%2BpuL2qrhBnEZaUjk1%2Bi4VU9cfmRU1VapRLEQDDiR00TZ7Par1GSsegpScrnu%2BtsbB5lIltdH1Qu1bhRXsxYuq94loYGe97vwYCX%2FPg2%2B%2BMG5TeOmgOIulsTKbkos0IQXQOPXiGJFsgDMA%2B8f%2BCpiiMo2KfZzVt5WhjTmY%2BGHwRA90U%2B7utnyM6ah7U%2FFg4VzC0DIHeGZ7myFfIpxhKk9MNW6IC1JEN2TIpBAYlgWoY07bSCffNzPK%2Bj%2FjMWkSJA52K2E3OEZTMqO7BM3PeuPL9la0aL3qBIq48wEW6vJ8DeV8g0CWHYBQJj0wmpvHGNTJ63dvoTcNgUlSF%2FGtHDXDVQDxJOkR239tI%2FK44blmeE5hBz9ekjNp7gx4jK3EBvyouWW2cGiCi0nCNWLocE0FCqYKfv9z2itx%2F7Tj2xa%2Fu12L90t5N21OoQ0PphXJHJzIeg9Bxs6GkpB3UwMcUC%2FfUkgh2PqGYvAR0FsqQTKxZN3%2BKIiFIGN59Jwx1kuoJsA7mkZCX98hMPp72I8dVQKz58nJXo3DiPA88nkrcAsys80hePyBUVlEavs6R31FI7zHFGcez1BivhP5QjtB8P8M%2BpiASlRUzqU7tsiboqqboscnVxatWPDKrBZNfDvdImySwH1Q%2B%2BAGpUsljkOdo6UQ8RT3h82kmM0UpKHd4aT74IXZaAJ%2FFSvHxNdx3qWvOLtmB%2F9oQ%2BpnY3wkW9lwrjUjV0TCx2TV3yqic0IlC23qN9CzzmlWZO%2Bh8bBTTqxkx3%2BKZQKexM1anPYyH%2BGcCId1e0w5lTIf8YTyJvRs7q8z3WdzRDgAjKnA87qeJ1Onm9jCj4WSGWvTQNgZyg4O2iaSK%2FpL6U2Rwudp95t9%2BJSNW9OPyxZpm97tZbv7jV8uQ0KmSI4AFG8iihCIiUUoNzrJL44P42X3aQ0acN3EHfXsPxAVOAv0bU8wvX7bdIRjB83SaHy91NoMEZPqOslleD3OPj%2FQ3YbGFFYY0NkmV0i%2Ff0I14WRPM1BfFTkm1AB01AAPA%2BkQ%2Bjj51iix%2B9wZhCMtfABc%2FVAzzEWcB9UYCLIdmavFOv4FxcWY3rYB8ldPD1WqGSKPqjM4NjAERNbWLpHqK8rcUnwUFZ1rBw%2B8x4tzp2ZdtvRA%2FXBOrMsHtONpb9rQ5jDhO9v9WZP%2BWyI9JcA0bHyS%2BNSAJ8FSqul0Poz1PLoeyUZPwOXk95pioUzpm144WJNd7%2FXpPMxgxq3r8GFlfBRFfczX0%3D&i=22"
    const handleSubmit = () => {
        console.log('lik', link)
        const id = videoId(link)
        setErrorMessage('loading....')

        setLink('')
        const options = {
            method: "GET",
            url: "https://youtube-video-download-info.p.rapidapi.com/dl",
            params: { id: `${id}` },
            headers: {
                "X-RapidAPI-Key": "aefb3fa51fmsha59d973a9f83424p149b2bjsn70bd6dd35de3",
                "X-RapidAPI-Host": "youtube-video-download-info.p.rapidapi.com",
            },
        };
        axios.request(options)
            .then((response) => {
                console.log('Resa', response)
                if (response.data.status === 'ok') {
                    const data = Object.values(response.data.link).map(val => {
                        const obj = {
                            url: val[0],
                            size: val[1],
                            quality: val[3],
                            type: val[4].split(';')[0]
                        }
                        return obj
                    })
                    setTitle(response.data.title)
                    console.log('DATA', data)
                    const val = [...new Set(data.map(val => val.quality))]
                    console.log('VAL', val)
                    setDownloadOptions(data)
                    setErrorMessage('')
                    setShowDownload(true)
                } else {
                    setErrorMessage(response.data.msg)
                }
            })
            .catch(e => setErrorMessage('Error Occured'))
    }
    const handleDownload = (e) => {
        console.log('Selected', e.target.value)
        setUrl(JSON.parse(e.target.value))
    }

    return (
        <Row>YTmusicdownloader
            <div>
                <Form.Control type='text' placeholder='Paste the link here...' value={link} onChange={(e) => setLink(e.target.value)} />
                <div><Button onClick={handleSubmit}>Search</Button></div>
                <div>
                    <div>
                        {
                            showDownload && <div>
                                <select onChange={handleDownload}>
                                    {
                                        downloadOptions.map((val, idx) => {
                                            return <option key={idx} value={JSON.stringify(val)}>{val.quality} - {val.size}</option>
                                        })
                                    }
                                </select>
                                {
                                    url.url && <div>
                                        <h4>{title}</h4>
                                        <h4>Quality :{url.quality}</h4>
                                        <h4>Size : {url.size}</h4>
                                        <div><a href={url.url} target='_blank'><button>Download</button></a></div>
                                    </div>
                                }
                            </div>
                        }

                    </div>
                    <h3>{errorMessage}</h3>
                </div>
            </div>
        </Row>
    )
}

export default YTmusicdownloader